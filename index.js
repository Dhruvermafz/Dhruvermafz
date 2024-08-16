/**
 * README Generator
 */
const md = require("markdown-it")({
  html: true,
  linkify: true,
  breaks: true,
});
const mdEmoji = require("markdown-it-emoji");
const fs = require("fs");
const axios = require("axios").default;

md.use(mdEmoji);

const BLOG_HOST = `https://dhruvermafz.vercel.app/blogs`;

/* README Sections */
const introTitle = generateTitle(
  2,
  `Hey :wave:, I'm ${generateLink(
    "Stanley",
    "https://dhruvermafz.vercel.app/"
  )}`
);
const introDescription = `I'm currently a software engineer at **${generateLink(
  "PickyVibe",
  "https://pickyvibe.com/"
)} based in 🌁 Noida. I am working on some side projects, learning a couple new technologies, and trying to explore new adventures in life..`;

const notice = `🍌 Don't forget to get some Potassium 🍌`;

const badgeConfigs = [
  {
    name: "Website",
    badgeText: "dhruvermafz.vercel.app",
    labelBgColor: "4E69C8",
    logoBgColor: "4E69C8",
    logo: "Firefox",
    link: "https://dhruvermafz.vercel.app",
  },
  {
    name: "Medium",
    badgeText: "@dhruvermafz",
    labelBgColor: "14c767",
    logoBgColor: "14c767",
    logo: "Medium",
    link: "https://medium.com/@dhruvermafz",
  },
  {
    name: "LinkedIn",
    badgeText: "@dhruvermafz",
    labelBgColor: "0077B5",
    logoBgColor: "0077B5",
    logo: "LinkedIn",
    link: "https://www.linkedin.com/in/dhruvermafz/",
  },
  {
    name: "DevTo",
    badgeText: "dhruvermafz",
    labelBgColor: "0A0A0A",
    logoBgColor: "0A0A0A",
    logo: "dev.to",
    link: "https://dev.to/dhruvermafz",
  },
];
const badges = badgeConfigs.reduce(
  (result, config) => result + " " + generateBadge(config),
  ""
);

const gif = `<img align="right" src="https://media1.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" />`;
const factsTitle = generateTitle(2, `:zap: A Few Quick Facts`);
const factsConfigs = [
  `🔭 I’m currently working on [Desi Discoveries](https://github.com/Dhruvermafz/desi_discoveries).`,
  `🧐 Learning about **serverless architectures**, **Dockerize**, and a bit of **system design**.`,
  `👨‍💻 Most of my projects are available on [Github](https://github.com/Dhruvermafz).`,
  `📝 I <del>regulary</del> write articles on [my blog](${BLOG_HOST}).`,
  `💬 Ping me about **react, nextjs, django, and cimeatic stuff**.`,
  `📙 Check out my [resume](https://dhruvermafz.vercel.app/).`,
  `🎉 Fun Fact: VALAR MORGHULIS`,
];
const facts = factsConfigs.reduce(
  (result, fact) => result + `\n - ${fact}`,
  ""
);

const postsTitle = generateTitle(2, `:black_nib: Recent Posts`);

const toolsTitle = generateTitle(2, `:rocket: Some Tools I Use`);
const toolsIconSize = 25;
const toolsConfig = [
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
    alt: "react",
  },

  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg",
    alt: "vue",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain.svg",
    alt: "bootstrap",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg",
    alt: "css3",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/gulp/gulp-plain.svg",
    alt: "gulp",
  },

  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    alt: "javascript",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    alt: "typescript",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg",
    alt: ".NET",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
    alt: "mongodb",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg",
    alt: "mysql",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg",
    alt: "redis",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg",
    alt: "nodejs",
  },

  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original-wordmark.svg",
    alt: "python",
  },

  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/travis/travis-plain.svg",
    alt: "travis",
  },
  {
    src: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/aws/aws.png",
    alt: "aws",
  },
  {
    src: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",
    alt: "gcp",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
    alt: "Docker",
  },
  {
    src: "https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg",
    alt: "Kubernetes",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    alt: "Go",
  },
];
const tools = toolsConfig.reduce(
  (result, toolConfig) =>
    result + "\n" + generateIcon(toolConfig, toolsIconSize),
  ""
);

const stats = `<img src="https://github-readme-stats.vercel.app/api?username=dhruvermafz&show_icons=true&count_private=true" alt="dhruvermafz" />`;

// Count is down, will they ever recover from this catastrophe? https://github.com/jwenjian/visitor-badge/issues/32
// const visitors = `![visitors](https://visitor-badge.glitch.me/badge?page_id=dhruvermafz.dhruvermafz)`;
const visitors = `[![HitCount](https://hits.dwyl.com/dhruvermafz/dhruvermafz/dhruvermafz.svg?style=flat-square)](http://hits.dwyl.com/dhruvermafz/dhruvermafz/dhruvermafz.svg?style=flat-square)`;

(async () => {
  // Get blog entries
  const response = await axios.get(
    `${BLOG_HOST}/page-data/index/page-data.json`
  );
  const postData = response.data.result.data.allMarkdownRemark.edges;
  let posts = ``;

  postData.slice(0, Math.min(postData.length, 5)).map((post) => {
    const title = post.node.frontmatter.title;
    const date = post.node.frontmatter.date;
    const path = post.node.frontmatter.path;
    posts += `<li><a target="_blank" href="${BLOG_HOST}${path}">${title} — ${date}</a></li>`;
  });

  const content = `${introTitle}\n
${introDescription}\n
${badges}\n
${notice}\n
${gif}\n
${factsTitle}\n
${facts}\n
${postsTitle}\n
<details>
    <summary>Explore</summary>
    ${posts}\n
</details>\n
<a target="_blank" href="${BLOG_HOST}">Read More</a>\n
${toolsTitle}\n
<p align="left">\n
    ${tools}\n
</p>\n
${stats}\n
${visitors}
`;

  const markdownContent = md.render(content);

  fs.writeFile("README.md", markdownContent, (err) => {
    if (err) {
      return console.error(err);
    }
    console.info(`Writing to README.md`);
  });
})();

function generateBadge(badgeConfig) {
  return `[![${badgeConfig.name} Badge](https://img.shields.io/badge/-${badgeConfig.badgeText}-${badgeConfig.labelBgColor}?style=flat-square&labelColor=${badgeConfig.logoBgColor}&logo=${badgeConfig.logo}&link=${badgeConfig.link})](${badgeConfig.link})`;
}

function generateIcon(iconConfig, toolsIconSize) {
  return `<img src="${iconConfig.src}" alt="${iconConfig.alt}" width="${toolsIconSize}" height="${toolsIconSize}" />`;
}

function generateTitle(size, title) {
  return `${"#".repeat(size)} ${title}`;
}

function generateLink(label, link) {
  return `[${label}](${link})`;
}
