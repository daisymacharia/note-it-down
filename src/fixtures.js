const inlineStyleButtons = [
  {
    value: "B",
    style: "BOLD",
    styleType: "bold",
  },

  {
    value: "I",
    style: "ITALIC",
    styleType: "italics",
  },

  {
    value: "U",
    style: "UNDERLINE",
    styleType: "underline",
  },

  {
    value: "abc",
    style: "STRIKETHROUGH",
    styleType: "line-through",
  },

  {
    value: "</>",
    style: "CODE",
    styleType: "none",
  },

  {
    value: "Highlight",
    style: "HIGHLIGHT",
    styleType: "none",
  },
];

const blockTypeButtons = [
  {
    value: "H1",
    block: "header-one",
  },

  {
    value: "H2",
    block: "header-two",
  },

  {
    value: "H3",
    block: "header-three",
  },

  {
    value: "GrBlockQuote",
    block: "blockquote",
  },

  {
    value: "AiOutlineUnorderedList",
    block: "unordered-list-item",
  },

  {
    value: "AiOutlineOrderedList",
    block: "ordered-list-item",
  },
];

export { blockTypeButtons, inlineStyleButtons };
