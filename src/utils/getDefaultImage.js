const DEFAULT_EVENT_IMAGES = {
    music: '/images/defaults/music.jpg',
    sports: '/images/defaults/sports.jpg',
    kidFriendly: '/images/defaults/kid-friendly.jpg',
    foodAndBev: '/images/defaults/food-and-bev.jpg'
  };

export const getDefaultImage = (type) => {
    switch (type?.toLowerCase()) {
      case 'music':
        return DEFAULT_EVENT_IMAGES.music;
      case 'sports':
        return DEFAULT_EVENT_IMAGES.sports;
      case 'games':
        return '/defaults/games.png';
      case 'kid friendly':
        return DEFAULT_EVENT_IMAGES.kidFriendly;
      case 'food & bev':
        return DEFAULT_EVENT_IMAGES.foodAndBev;
      default:
        return '/defaults/default.png';
    }
  };