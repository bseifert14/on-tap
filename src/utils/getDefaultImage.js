import { PhotoRef } from "../constants/photoRef";

const DEFAULT_EVENT_IMAGES = {
    foodAndBev: PhotoRef.EventImages.DefaultFoodAndBev,
    games: PhotoRef.EventImages.DefaultGames,
    kidFriendly: PhotoRef.EventImages.DefaultKidFriendly,
    music: PhotoRef.EventImages.DefaultMusic,
    sports: PhotoRef.EventImages.DefaultSports
  };

export const getDefaultImage = (type) => {
    switch (type?.toLowerCase()) {
      case 'music':
        return DEFAULT_EVENT_IMAGES.music;
      case 'sports':
        return DEFAULT_EVENT_IMAGES.sports;
      case 'games':
        return DEFAULT_EVENT_IMAGES.games;
      case 'kid friendly':
        return DEFAULT_EVENT_IMAGES.kidFriendly;
      case 'food & bev':
        return DEFAULT_EVENT_IMAGES.foodAndBev;
      default:
        return '/defaults/default.png';
    }
  };