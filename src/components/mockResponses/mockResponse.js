export const mockResponse = {
  headerResponse: {
    message: "success",
    data: [
      {
        header_name: "Resume",
        id: 300,
        route: "/resume",
      },
      {
        header_name: "Projects",
        id: 301,
        route: "/projects",
      },
      {
        header_name: "React Tips",
        id: 302,
        route: "/react-tips",
      },
      {
        header_name: "My Boilerplate Project",
        id: 303,
        route: "/my-boilerplate-project",
      },
      {
        header_name: "Contact Details",
        id: 304,
        route: "/contact-details",
      },
    ],
  },
  menuResponse: {
    301: {
      message: "success",
      data: [
        {
          MENU_NAME: "Easy",
          ID: 502,
          SubMenus: [
            {
              PARENT_ID: 502,
              ID: 602,
              MENU_NAME: "Counter",
              SubMenus: [],
            },
            {
              PARENT_ID: 502,
              ID: 603,
              MENU_NAME: "Random Jokes",
              SubMenus: [],
            },
            {
              PARENT_ID: 502,
              ID: 604,
              MENU_NAME: "Morse Translator",
              SubMenus: [],
            },
          ],
        },
      ],
    },
    300: {
      message: "success",
      data: [
        {
          MENU_NAME: "My Resume",
          ID: 502,
          SubMenus: [
            // {
            //   PARENT_ID: 502,
            //   ID: 602,
            //   MENU_NAME: "calendar",
            //   CREATED_BY: "root@localhost",
            //   CREATED_AT: "2024-05-23T08:59:47.000Z",
            //   UPDATED_BY: "root@localhost",
            //   UPDATED_AT: "2024-05-23T08:59:47.000Z",
            //   SubMenus: [],
            // },
          ],
        },
      ],
    },
  },
  authResponse: {
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJuYW1lIjoidGVzdDIwIiwiZW1haWwiOiJ0ZXN0MjBAZ21haWwuY29tIiwicm9sZUlkIjoxMDAsImlhdCI6MTcxNzQ3MDAxOSwiZXhwIjoxNzE3NDcwMDI5fQ.01Oq38m5twr-Kvfh4beO2jPuLjD2NH1Uzi-w24HVQ4k",
  },
};
