import moment from "moment";

// All date are in January 2021, select different date ranges within this period to see different results.

const dummyData = [
  {
    From: "aaa@example.com",
    To: "zzz.zzz@example.com",
    Subject: "[ HR-888 ] Notice of official announcement",
    Body:
      "Maecenas blandit, augue et lobortis tincidunt, nulla leo gravida elit, eget condimentum augue est a arcu. Fusce posuere massa condimentum elit finibus dignissim.",
    Date: Date.now(),
    Attachment: false,
  },
  {
    From: "bbb@example.com",
    To: ["yyy@example.com", "dcdcd@multipleTos.com"],
    Subject: "[web:333] 'Web Contact'",
    Body:
      " Etiam porttitor lobortis felis id suscipit. Mauris enim libero, commodo at euismod id, elementum feugiat tellus. Cras a congue quam, et convallis mi. Proin sed mauris viverra, sagittis augue vitae, aliquam felis.",
    Date: 1611551493358,
    Attachment: false,
  },
  {
    From: "ccc@example.com",
    To: "ttt@example.com",
    Subject: "Happy New Year! Greetings for the New Year.",
    Body: "Donec facilisis tempus leo, eget blandit velit congue a.",
    Date: 1611151493358,
    Attachment: true,
  },
  {
    From: "sss@example.com",
    To: "vvv@example.com",
    Subject: "[HR-887(Revised: Office Expansion Project Team)] Notice of",
    Body:
      "Nullam dapibus nisi augue. Aliquam ac dui ultricies, bibendum nisl nec, dignissim felis. Suspendisse vehicula ante lorem, ultricies lobortis elit lobortis id. Vestibulum at imperdiet justo, eu bibendum lectus.",
    Date: 1609221493358,
    Attachment: true,
  },
  {
    From: "kkk@example.com",
    To: "ggg@example.com",
    Subject: "[Github] Logout page",
    Body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor lobortis felis id suscipit. Mauris enim libero, commodo at euismod id, elementum feugiat tellus. Cras a congue quam, et convallis mi. Proin sed mauris viverra, sagittis augue vitae, aliquam felis.",
    Date: Date.now(),
    Attachment: true,
  },
  {
    From: "ssfds@example.com",
    To: ["vvfffv@example.com", "dsadav@sendtomore.com", "cococo@andmore.com"],
    Subject: "[dev]Postfix 3.1.12 / 3.2.9 / 3.3.4 / 3.4.5",
    Body:
      "Quisque vel ligula eget dolor porttitor pharetra. Mauris quis porta justo. Phasellus ullamcorper dapibus euismod. Vestibulum ornare porta ultrices. Proin risus lacus, finibus vel varius sit amet, finibus ut dui. Cras nec ornare diam. Proin hendrerit at quam id efficitur. Fusce vitae urna ut magna consequat porta at egestas turpis. Vivamus varius lobortis nulla, sed blandit ex commodo id.",
    Date: 1611251493358,
    Attachment: false,
  },
  {
    From: "jjj@example.com",
    To: [
      "llll@example.com",
      "jhjhj@example.com",
      "hghghg@example.com",
      "kjkjkjk@example.com",
      "yhyhyh@example.com",
      "systysts@example.com",
    ],
    Subject: "Re: [Github] Brush-up on loading animation",
    Body:
      " Mauris enim libero, commodo at euismod id, elementum feugiat tellus. Cras a congue quam, et convallis mi. Proin sed mauris viverra, sagittis augue vitae, aliquam felis.",
    Date: 1610240293358,
    Attachment: false,
  },
];

export { dummyData };
