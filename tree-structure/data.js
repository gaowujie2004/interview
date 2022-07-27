const body = {
  id: 'main',
  tag: 'main',
  childNodes: [
    {
      tag: 'p',
      id: 'p1',
      childNodes: [
        {
          tag: 'span',
          id: 'span1',
          childNodes: [
            {
              tag: 'text',
              content: 'T1',
              childNodes: [],
            },
          ],
        },
        {
          tag: 'span',
          id: 'span2',
          childNodes: [
            {
              tag: 'text',
              content: 'T2',
              childNodes: [],
            },
          ],
        },
        {
          tag: 'span',
          id: 'span3',
          childNodes: [
            {
              tag: 'text',
              content: 'T3',
              childNodes: [],
            },
          ],
        },
      ],
    },
    {
      tag: 'p',
      id: 'p2',
      childNodes: [
        {
          tag: 'text',
          content: 'T4',
          childNodes: [],
        },
      ],
    },
    {
      tag: 'p',
      id: 'p3',
      childNodes: [
        {
          tag: 'text',
          content: 'T5',
          childNodes: [],
        },
      ],
    },
  ],
};

module.exports = {
  body,
};
