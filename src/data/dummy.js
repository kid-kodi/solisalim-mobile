export const SECTIONS = [
  {
    title: 'Récemments ajoutés',
    horizontal: true,
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/10/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1002/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1006/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1008/200',
      },
    ],
  },
  {
    title: 'Populaires',
    horizontal: true,
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1011/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1012/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1013/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1015/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1016/200',
      },
    ],
  },
  {
    title: 'Exclusivité',
    horizontal: true,
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1020/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1024/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1027/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1035/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1038/200',
      },
    ],
  },
];

export const IMAGES = [
  'https://cdn.pixabay.com/photo/2015/01/31/08/56/arabs-618308_1280.jpg',
  'https://cdn.pixabay.com/photo/2020/11/24/18/58/mosque-5773586_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/06/27/22/18/moscow-cathedral-mosque-1483524_1280.jpg',
];

export const COMMENTS = [
  {id: 1, text: 'Great post!', author: 'John Doe', timestamp: '2023-06-01'},
  {id: 2, text: 'Nice article!', author: 'Jane Smith', timestamp: '2023-06-02'},
  // Add more comments as needed
];

export const MUSICS = [
  {
    id: 1,
    url: 'https://www.solisalim.com/audio/Sourate1.mp3', // Load media from the network
    title: 'Sourate 1 Al Fatiha - Prologue ou LOuverture (Français-Arabe).mp3',
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
    artwork:
      'https://cdn.pixabay.com/photo/2019/05/04/18/13/quran-4178711_1280.jpg', // Load artwork from the network
    duration: 402, // Duration in seconds
  },
  {
    id: 2,
    url: 'https://www.solisalim.com/audio/Sourate2.mp3', // Load media from the network
    title: 'Sourate 2 Al Baqarah - La Vache (Français-Arabe).mp3',
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
    artwork:
      'https://cdn.pixabay.com/photo/2019/05/04/18/13/quran-4178711_1280.jpg', // Load artwork from the network
    duration: '402', // Duration in seconds
  },
  {
    id: 3,
    url: 'https://www.solisalim.com/audio/Sourate3.mp3', // Load media from the network
    title: "Sourate 3 Al Imran - La Famille d'Imran (Français-Arabe)",
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
    artwork:
      'https://cdn.pixabay.com/photo/2019/05/04/18/13/quran-4178711_1280.jpg', // Load artwork from the network
    duration: '402', // Duration in seconds
  },
  {
    id: 4,
    url: 'https://www.solisalim.com/audio/Sourate4.mp3', // Load media from the network
    title: 'Sourate 4 An Nisâ - Les Femmes (Français-Arabe).mp3',
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
    artwork:
      'https://cdn.pixabay.com/photo/2019/05/04/18/13/quran-4178711_1280.jpg', // Load artwork from the network
    duration: '402', // Duration in seconds
  },
];
