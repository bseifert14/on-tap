import { PhotoRef } from "../constants/photoRef";

const DEFAULT_EVENT_IMAGES = {
    foodAndBev: PhotoRef.EventImages.DefaultFoodAndBev,
    games: PhotoRef.EventImages.DefaultGames,
    kidFriendly: PhotoRef.EventImages.DefaultKidFriendly,
    music: PhotoRef.EventImages.DefaultMusic,
    sports: PhotoRef.EventImages.DefaultSports
  };

export const getDefaultImage = (slug) => {
    switch (slug) {
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

      // Fitness subtypes
      case 'barre':
        return PhotoRef.DEFAULT_IMAGES.barre;
      case 'pilates':
        return PhotoRef.DEFAULT_IMAGES.pilates;
      case 'yoga':
      case 'fitness':
        return PhotoRef.DEFAULT_IMAGES.yoga;

      // Workshops subtype
      case 'textile-fiber':
        return PhotoRef.DEFAULT_IMAGES["textile-fiber"];
      default:
        return '/defaults/default.png';
    }
  };