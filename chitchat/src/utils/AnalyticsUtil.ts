import { reportConversation, reportPageLeave, reportBatch } from '../api/analytics';
import type { ConversationAnalytics, PageLeaveAnalytics } from '../api/analytics';
import LocalStorageUtil from './LocalStorageUtil';

// 生成唯一会话ID
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// 埋点数据管理类
class AnalyticsManager {
  private conversationData: Map<string, ConversationAnalytics> = new Map();
  private pageEnterTime: number = 0;
  private currentSessionId: string = '';
  private currentAiRoleId: string = '';
  private userId: string | undefined;
  private pendingData: { conversations: ConversationAnalytics[], pageLeaves: PageLeaveAnalytics[] } = {
    conversations: [],
    pageLeaves: []
  };

  constructor() {
    this.currentSessionId = generateSessionId();
    this.loadPendingData();
    this.setupAutoReport();
    this.setupPageLifecycle();
  }

  // 加载未上报的数据
  private loadPendingData() {
    const saved = LocalStorageUtil.getItem<typeof this.pendingData>('analytics_pending');
    if (saved) {
      this.pendingData = saved;
      // 尝试上报未发送的数据
      this.flushPendingData();
    }
  }

  // 保存待上报数据到本地存储
  private savePendingData() {
    LocalStorageUtil.setItem('analytics_pending', this.pendingData);
  }

  // 设置用户ID
  setUserId(userId: string) {
    this.userId = userId;
  }

  // 设置当前AI角色ID
  setCurrentAiRoleId(roleId: string) {
    this.currentAiRoleId = roleId;
  }

  // 页面进入
  pageEnter(url: string = window.location.href) {
    this.pageEnterTime = Date.now();
    this.currentSessionId = generateSessionId();
  }

  // 页面离开
  async pageLeave(leaveType: 'navigate' | 'close' | 'refresh' = 'navigate') {
    if (this.pageEnterTime === 0) return;

    const now = Date.now();
    const stayDuration = Math.floor((now - this.pageEnterTime) / 1000);

    const pageLeaveData: PageLeaveAnalytics = {
      sessionId: this.currentSessionId,
      pageUrl: window.location.href,
      enterTime: this.pageEnterTime,
      leaveTime: now,
      stayDuration,
      leaveType,
      currentAiRoleId: this.currentAiRoleId,
      userId: this.userId
    };

    try {
      await reportPageLeave(pageLeaveData);
      console.log('页面离开统计上报成功', pageLeaveData);
    } catch (error) {
      console.error('页面离开统计上报失败', error);
      // 失败时保存到本地，等待下次上报
      this.pendingData.pageLeaves.push(pageLeaveData);
      this.savePendingData();
    }
  }

  // 开始对话会话
  startConversation(aiRoleId: string) {
    const conversationId = `conv_${aiRoleId}_${Date.now()}`;
    const conversationData: ConversationAnalytics = {
      sessionId: this.currentSessionId,
      aiRoleId,
      startTime: Date.now(),
      messageCount: 0,
      userId: this.userId
    };

    this.conversationData.set(conversationId, conversationData);
    this.setCurrentAiRoleId(aiRoleId);

    return conversationId;
  }

  // 记录消息发送
  recordMessage(conversationId: string) {
    const conversation = this.conversationData.get(conversationId);
    if (conversation) {
      conversation.messageCount++;
      this.conversationData.set(conversationId, conversation);
    }
  }

  // 结束对话会话
  async endConversation(conversationId: string) {
    const conversation = this.conversationData.get(conversationId);
    if (!conversation) return;

    const now = Date.now();
    conversation.endTime = now;
    conversation.duration = Math.floor((now - conversation.startTime) / 1000);

    try {
      await reportConversation(conversation);
      console.log('对话统计上报成功', conversation);
      this.conversationData.delete(conversationId);
    } catch (error) {
      console.error('对话统计上报失败', error);
      // 失败时保存到本地，等待下次上报
      this.pendingData.conversations.push(conversation);
      this.savePendingData();
      this.conversationData.delete(conversationId);
    }
  }

  // 获取当前活跃的对话
  getActiveConversations(): ConversationAnalytics[] {
    return Array.from(this.conversationData.values());
  }

  // 设置页面生命周期监听
  private setupPageLifecycle() {
    // 页面关闭前
    window.addEventListener('beforeunload', () => {
      this.pageLeave('close');
      this.endAllActiveConversations();
    });

    // 页面可见性变化
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // 页面隐藏时结束所有活跃对话
        this.endAllActiveConversations();
      }
    });

    // 监听路由变化（如果使用React Router）
    window.addEventListener('popstate', () => {
      this.pageLeave('navigate');
    });
  }

  // 结束所有活跃对话
  private async endAllActiveConversations() {
    const activeConversations = Array.from(this.conversationData.keys());
    for (const conversationId of activeConversations) {
      await this.endConversation(conversationId);
    }
  }

  // 定时上报机制
  private setupAutoReport() {
    // 每5分钟尝试上报一次未发送的数据
    setInterval(() => {
      this.flushPendingData();
    }, 5 * 60 * 1000);
  }

  // 上报待发送数据
  private async flushPendingData() {
    if (this.pendingData.conversations.length === 0 && this.pendingData.pageLeaves.length === 0) {
      return;
    }

    try {
      await reportBatch(this.pendingData);
      console.log('批量上报成功', this.pendingData);
      // 清空待上报数据
      this.pendingData = { conversations: [], pageLeaves: [] };
      LocalStorageUtil.removeItem('analytics_pending');
    } catch (error) {
      console.error('批量上报失败', error);
      this.savePendingData();
    }
  }

  // 手动触发数据上报
  async flush() {
    await this.endAllActiveConversations();
    await this.flushPendingData();
  }
}

// 创建全局实例
const analyticsManager = new AnalyticsManager();

export default analyticsManager;
