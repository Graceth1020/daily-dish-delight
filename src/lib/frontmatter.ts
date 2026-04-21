// 轻量 YAML frontmatter 解析器（仅支持本项目使用的子集：
// 标量、字符串数组（- item）、对象数组（- key: value）），
// 避免在浏览器引入 gray-matter / Buffer polyfill。

export type Frontmatter = Record<string, any>;

export function parseFrontmatter(raw: string): { data: Frontmatter; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const [, yaml, content] = match;
  const lines = yaml.split(/\r?\n/);
  const data: Frontmatter = {};

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) {
      i++;
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) {
      i++;
      continue;
    }
    const key = kv[1];
    const value = kv[2];

    if (value !== "") {
      data[key] = stripQuotes(value);
      i++;
      continue;
    }

    // 多行值：收集后续以更深缩进开头的行
    const items: any[] = [];
    i++;
    while (i < lines.length) {
      const next = lines[i];
      if (!next.startsWith("  ")) break;
      const trimmed = next.trim();
      if (trimmed.startsWith("- ")) {
        const after = trimmed.slice(2);
        // 对象项：- key: value，后续 "    key: value" 续行
        const objMatch = after.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
        if (objMatch) {
          const obj: Record<string, string> = {};
          obj[objMatch[1]] = stripQuotes(objMatch[2]);
          i++;
          while (i < lines.length && lines[i].startsWith("    ")) {
            const sub = lines[i].trim().match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
            if (sub) obj[sub[1]] = stripQuotes(sub[2]);
            i++;
          }
          items.push(obj);
        } else {
          items.push(stripQuotes(after));
          i++;
        }
      } else {
        i++;
      }
    }
    data[key] = items;
  }

  return { data, content };
}

function stripQuotes(v: string): string {
  const t = v.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1);
  }
  return t;
}
