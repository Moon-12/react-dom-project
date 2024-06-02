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
};
