export default function EventTypeOptionList() {
  return (
    <>
        <option value="">Select Event Type</option>

        <optgroup label="Events">
            <option value="comedy">Comedy</option>
            <option value="dance">Dance</option>
            <option value="events">Events</option>
            <option value="family">Family</option>
            <option value="festival">Festival</option>
            <option value="film">Film</option>
            <option value="fundraiser">Fundraiser</option>
            <option value="games">Games</option>
            <option value="holiday">Holiday</option>
            <option value="music">Music</option>
            <option value="networking">Networking</option>
            <option value="open-mic">Open Mic</option>
            <option value="theater">Theater</option>
            <option value="trivia">Trivia</option>
        </optgroup>

        <optgroup label="Fitness">
            <option value="barre">Barre</option>
            <option value="fitness">Fitness</option>
            <option value="meditation">Meditation</option>
            <option value="pilates">Pilates</option>
            <option value="wellness">Wellness</option>
            <option value="yoga">Yoga</option>
        </optgroup>

        <optgroup label="Food & Drink">
            <option value="beer-tasting">Beer Tasting</option>
            <option value="brunch">Brunch</option>
            <option value="cooking-class">Cooking Class</option>
            <option value="dinner">Dinner</option>
            <option value="farmers-market">Farmers Market</option>
            <option value="food-drink">Food & Drink</option>
            <option value="wine-tasting">Wine Tasting</option>
        </optgroup>

        <optgroup label="Outdoors">
            <option value="climbing">Climbing</option>
            <option value="cycling">Cycling</option>
            <option value="hiking">Hiking</option>
            <option value="outdoors">Outdoors</option>
            <option value="running">Running</option>
            <option value="skiing">Skiing</option>
        </optgroup>

        <optgroup label="Workshops">
            <option value="jewelry-making">Jewelry Making</option>
            <option value="painting">Painting</option>
            <option value="photography">Photography</option>
            <option value="pottery">Pottery</option>
            <option value="textile-fiber">Textile & Fiber</option>
            <option value="woodworking">Woodworking</option>
            <option value="workshops">Workshops</option>
        </optgroup>
    </>
  )
}
