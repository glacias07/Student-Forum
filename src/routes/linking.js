const config = {
  screens: {
    MainApp: {
      screens: {
        Posts: {
          screens: {
            Feed: 'feed',
          },
        },
      },
    },
    // PostDetails:'pd'
    PostDetails: {
        path:'pd/:id',
        parse: {
            id: (id) => `${id}`,
          },
    }
  },
};

const linking = {
  prefixes: ['stufo://app','https://stufo.com'],
  config,
};

export default linking;
