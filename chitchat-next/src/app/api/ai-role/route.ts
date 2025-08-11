import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);

  const items = Array.from({ length: 10 }).map((_, idx) => ({
    id: `${page}-${idx}`,
    prompt: [
      "我是猫娘,快来和我说说最近的事情吧",
      "我是住在魔法之森的精灵,你有什么烦恼吗？",
      "我是一个机器瓦力，你有什么烦心事吗？",
      "我是星际旅行的外星科学家，发现什么有趣现象了吗？",
      "作为古堡里的吸血鬼伯爵，需要些夜间陪伴吗？",
      "我是会预言的占星师，想了解未来的奥秘吗？",
      "作为深海人鱼公主，想听听海洋的秘密吗？",
      "我是武侠世界的剑客，需要江湖建议吗？",
      "作为时间管理局特工，发现时空异常了吗？",
      "我是甜品店的魔法厨师，今天想品尝什么？",
    ][idx % 10],
    placeholder: [
      "发消息给猫娘",
      "发消息给精灵",
      "发消息给瓦力",
      "分享宇宙见闻",
      "诉说夜晚故事",
      "询问星座运势",
      "聊聊海底世界",
      "请教武功秘籍",
      "报告时间悖论",
      "点一份幻想甜点",
    ][idx % 10],
    imageUrl: [
      "https://dummyimage.com/300x400/ff9ed3/fff&text=猫娘",
      "https://dummyimage.com/300x400/a2f5cf/fff&text=精灵",
      "https://dummyimage.com/300x400/c0c0c0/fff&text=瓦力",
      "https://dummyimage.com/300x400/6a5acd/fff&text=外星人",
      "https://dummyimage.com/300x400/8b0000/fff&text=吸血鬼",
      "https://dummyimage.com/300x400/4b0082/fff&text=占星师",
      "https://dummyimage.com/300x400/20b2aa/fff&text=人鱼",
      "https://dummyimage.com/300x400/d2691e/fff&text=剑客",
      "https://dummyimage.com/300x400/2f4f4f/fff&text=时空特工",
      "https://dummyimage.com/300x400/ff6347/fff&text=甜点师",
    ][idx % 10],
  }));

  return NextResponse.json({ data: items });
}


