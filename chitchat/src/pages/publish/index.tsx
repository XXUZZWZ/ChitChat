import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Field, Toast } from 'react-vant'
import useTitle from '../../hooks/useTitle'
import useAiRoleListStore from '../../store/useAiRoleListStore'
import styles from './index.module.css'

const Publish = () => {
  useTitle('发布')
  const navigate = useNavigate()
  const { aiRoleList } = useAiRoleListStore()
  
  const [formData, setFormData] = useState({
    title: '',
    prompt: '',
    placeholder: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateImageUrl = (title: string) => {
    const colors = ['ff9ed3', 'a2f5cf', 'c0c0c0', '6a5acd', 'ffa07a', '98fb98', 'dda0dd', 'f0e68c']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    return `https://dummyimage.com/412x915/${randomColor}/fff&text=${encodeURIComponent(title)}`
  }

  const handlePublish = async () => {
    if (!formData.title.trim()) {
      Toast.fail('请输入角色名称')
      return
    }
    if (!formData.prompt.trim()) {
      Toast.fail('请输入角色设定')
      return
    }
    if (!formData.placeholder.trim()) {
      Toast.fail('请输入提示文字')
      return
    }

    setLoading(true)
    
    try {
      // 创建新的AI角色
      const newRole = {
        id: `user_${Date.now()}`,
        prompt: formData.prompt,
        placeholder: formData.placeholder,
        imageUrl: generateImageUrl(formData.title),
        title: formData.title,
        description: formData.description,
        createdAt: Date.now(),
        messageCount: 0,
        hasMessages: false
      }

      // 保存到localStorage
      const existingRoles = JSON.parse(localStorage.getItem('aiRoleList') || '[]')
      const updatedRoles = [newRole, ...existingRoles]
      localStorage.setItem('aiRoleList', JSON.stringify(updatedRoles))
      
      // 同时更新全局状态，确保首页能找到新角色
      useAiRoleListStore.setState({ 
        aiRoleList: [newRole, ...aiRoleList] 
      })
      
      // 初始化聊天记录
      const storageKey = `chat_messages_${newRole.prompt?.slice(0, 20) || 'default'}`
      localStorage.setItem(storageKey, JSON.stringify([{role: 'system', content: newRole.prompt}]))
      
      Toast.success('发布成功！')
      
      // 跳转到账户页面查看作品
      setTimeout(() => {
        navigate('/account')
      }, 1500)
      
    } catch (error) {
      Toast.fail('发布失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>创建AI角色</h1>
        <p className={styles.subtitle}>设计你的专属AI角色</p>
      </div>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>角色名称</label>
          <Field
            value={formData.title}
            onChange={(value) => handleInputChange('title', value)}
            placeholder="给你的AI角色起个名字"
            className={styles.field}
            clearable
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>角色设定</label>
          <Field
            value={formData.prompt}
            onChange={(value) => handleInputChange('prompt', value)}
            placeholder="我是一个..."
            type="textarea"
            rows={4}
            className={styles.textarea}
            maxlength={200}
          />
          <div className={styles.tip}>
            描述角色的身份、性格、背景等，这将决定AI的回答风格
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>提示文字</label>
          <Field
            value={formData.placeholder}
            onChange={(value) => handleInputChange('placeholder', value)}
            placeholder="发消息给..."
            className={styles.field}
            clearable
          />
          <div className={styles.tip}>
            用户在聊天时看到的输入框提示文字
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>角色描述 (可选)</label>
          <Field
            value={formData.description}
            onChange={(value) => handleInputChange('description', value)}
            placeholder="简单介绍一下这个角色的特点..."
            type="textarea"
            rows={3}
            className={styles.textarea}
            maxlength={100}
          />
        </div>

        <div className={styles.preview}>
          <h3 className={styles.previewTitle}>预览</h3>
          <div className={styles.previewCard}>
            <div className={styles.previewImage}>
              <img 
                src={formData.title ? generateImageUrl(formData.title) : 'https://dummyimage.com/412x915/ddd/999&text=预览'} 
                alt="角色预览" 
              />
            </div>
            <div className={styles.previewInfo}>
              <h4>{formData.title || '角色名称'}</h4>
              <p>{formData.description || '角色描述'}</p>
            </div>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          loading={loading}
          onClick={handlePublish}
          className={styles.publishBtn}
          block
        >
          发布角色
        </Button>
      </div>
    </div>
  )
}

export default Publish
