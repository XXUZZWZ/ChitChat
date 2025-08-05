import Mock from "mockjs";
import pkg from "jsonwebtoken";
// 每页10个
const getImages = (page, pageSize = 10) => {
  return Array.from({ length: pageSize }, (_, i) => ({
    id: `${page}-${i}`,
    height: Mock.Random.integer(300, 600),
    url: Mock.Random.image("300x400", Mock.Random.color(), "#fff", "image"),
  }));
};

const { sign, decode } = pkg;
// 服务端私钥
const secret = "jwt-demo-secret";
const getAiRole = (page, pageSize = 10) => {
  return Array.from({ length: pageSize }, (_, i) => ({
    id: `${page}-${i}`,
    prompt: Mock.Random.csentence(20, 30),
    placeholder: Mock.Random.csentence(5, 10),
    imageUrl: Mock.Random.image(
      "412x915",
      Mock.Random.color(),
      "#fff",
      "image"
    ),
  }));
};
export default [
  // 搜索页推荐接口
  {
    url: "/api/search",
    method: "get",
    timeout: "1000",
    response: (req, res) => {
      const keyword = req.query.keyword;
      let num = Math.floor(Math.random() * 10);
      let list = [];
      for (let i = 0; i < num; i++) {
        // 随机内容
        const randomData = Mock.mock({
          title: "@ctitle(3,6)",
        });
        console.log(randomData);
        list.push(`${randomData.title} ${keyword}`);
      }
      // ? keyword = 是query 前端传递方式
      return {
        code: 0,
        data: list,
      };
    },
  },
  // 搜索热词接口
  {
    url: "/api/hotlist",
    method: "get",
    response: () => {
      return {
        code: 0,
        data: [
          {
            id: "101",
            role: "猫娘",
          },
          {
            id: "102",
            role: "精灵",
          },
          {
            id: "103",
            role: "机器瓦力",
          },
          {
            id: "104",
            role: "外星人",
          },
        ],
      };
    },
  },
  // 详情页接口
  {
    url: "/api/detail/:id",
    method: "get",
    response: (req, res) => {
      const randomData = Mock.mock({
        title: "@ctitle(5,10)",
        price: "@integer(1000, 5000)",
        desc: "@cparagraph(3,4)",
        images: [
          {
            url: "@image(200x200, @color,#fff,@ctitle)",
            alt: "@ctitle(5,10)",
          },
          {
            url: "@image(200x200, @color,#fff,@ctitle)",
            alt: "@ctitle(5,10)",
          },
          {
            url: "@image(200x200, @color,#fff,@ctitle)",
            alt: "@ctitle(5,10)",
          },
          {
            url: "@image(200x200, @color,#fff,@ctitle)",
            alt: "@ctitle(5,10)",
          },
          {
            url: "@image(200x200, @color,#fff,@ctitle)",
            alt: "@ctitle(5,10)",
          },
          {
            url: "@image(200x200, @color,#fff,@ctitle)",
            alt: "@ctitle(5,10)",
          },
          {
            url: "@image(200x200, @color,#fff,@ctitle)",
            alt: "@ctitle(5,10)",
          },
          {
            url: "@image(200x200, @color,#fff,@ctitle)",
            alt: "@ctitle(5,10)",
          },
        ],
      });
      return {
        code: 0,
        data: randomData,
      };
    },
  },
  // 图片含多页分页接口
  {
    // ?page=1 url 里的queryString
    url: "/api/images",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page); // 将string 转成 number
      return {
        code: 0,
        data: getImages(page),
      };
    },
  },
  // 获取ai扮演的角色prompt 和 placeholder和背景图片imgUrl
  // 一页10条
  {
    url: "/api/ai-role",
    method: "get",
    response: ({ query }) => {
      return {
        code: 0,
        data: getAiRole(query.page),
      };
    },
  },
  // 登录
  {
    url: "/api/login",
    method: "post",
    response: (req) => {
      const { username, password } = req.body;
      if (username !== "admin" || password !== "123456") {
        return {
          code: 1,
          message: "用户名或密码错误",
        };
      }
      const token = sign(
        {
          user: {
            id: "001",
            username: "admin",
          },
        },
        secret,
        { expiresIn: "86400" }
      );
      return {
        token,
        data: {
          id: "001",
          username: "admin",
        },
      };
    },
  },
  // 检查登录状态
  {
    url: "/api/user",
    method: "GET",
    response: (req) => {
      const authHeader = req.headers["authorization"].split(" ")[1];
      //console.log(authHeader);
      const token = authHeader;
      //console.log(token);
      if (!token) {
        return { code: 1, message: "未找到 token" };
      }

      try {
        // const decoded = `fsfsdsfd`
        // console.log(token);
        // const tokenn =
        //  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMDAxIiwidXNlcm5hbWUiOiJhZG1pbiJ9LCJpYXQiOjE3NTMyNDQwMjYsImV4cCI6MTc1MzI0NDExMn0.WVEf6RkWnYHvaJL6T7Me1qFB2HXskN5hh4Gq38sxhU0";

        console.log(token);
        const data = decode(token);
        // console.log(jwt.decode);
        console.log(data, "AAA");

        return {
          code: 0,
          message: "获取用户信息成功",
          username: data.user.username,
        };
      } catch (err) {
        return { code: 1, message: "token验证失败", err };
      }
    },
  },
  // 注册
  {
     url: "/api/user/register",
     method: "post",
     response: (req) => { 
      const { username, password } = req.body;
      if (username !== "admin" || password !== "123456") {
        return {
          code: 1,
          message: "用户名或密码错误",
        };
      }
      return {
        code: 0,
        message: "注册成功",
      };
     },
  },
];
