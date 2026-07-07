const sampleListings = [
  {
    title: "Luxury Beach Villa",
    description:
      "Wake up to breathtaking ocean views in this luxurious beachfront villa with direct beach access and modern amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    },
    price: 4200,
    location: "Goa",
    country: "India",
    category: "beach",
  },
  {
    title: "Royal Scottish Castle",
    description:
      "Experience royal living in this beautifully preserved castle surrounded by rolling green hills.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=60",
    },
    price: 7500,
    location: "Edinburgh",
    country: "Scotland",
    category: "castles",
  },
  {
    title: "Himalayan Mountain Lodge",
    description:
      "Escape to this peaceful mountain lodge offering panoramic Himalayan views and cozy interiors.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Manali",
    country: "India",
    category: "mountains",
  },
  {
    title: "Organic Farm Retreat",
    description:
      "Stay amidst lush farms, enjoy fresh organic food, and experience authentic countryside living.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
    },
    price: 1400,
    location: "Nashik",
    country: "India",
    category: "farms",
  },
  {
    title: "Lakeside Wooden Cabin",
    description:
      "Relax in this charming wooden cabin overlooking a crystal-clear lake surrounded by pine forests.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60",
    },
    price: 1900,
    location: "Lake Tahoe",
    country: "United States",
    category: "cabins",
  },
  {
    title: "Forest Treehouse Escape",
    description:
      "Reconnect with nature in this unique treehouse nestled high among ancient trees.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Wayanad",
    country: "India",
    category: "treehouses",
  },
  {
    title: "Adventure Camping Site",
    description:
      "Spend unforgettable nights under the stars with campfires, trekking trails, and scenic valleys.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Rishikesh",
    country: "India",
    category: "camping",
  },
  {
    title: "Luxury Lakefront Villa",
    description:
      "Enjoy peaceful mornings by the lake in this elegant villa with private docks and sunset views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Queenstown",
    country: "New Zealand",
    category: "lakefront",
  },
  {
    title: "Private Island Paradise",
    description:
      "A secluded island retreat featuring crystal-clear waters, white sand beaches, and ultimate privacy.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    },
    price: 9800,
    location: "Maldives",
    country: "Maldives",
    category: "islands",
  },
  {
    title: "Luxury Desert Camp",
    description:
      "Experience the magic of the desert with luxury tents, camel rides, and spectacular night skies.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=60",
    },
    price: 2700,
    location: "Jaisalmer",
    country: "India",
    category: "desert",
  },
  {
    title: "Snowy Alpine Chalet",
    description:
      "Enjoy a cozy winter escape in this alpine chalet surrounded by snow-covered peaks and ski trails.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=60",
    },
    price: 3900,
    location: "Zermatt",
    country: "Switzerland",
    category: "snow",
  },
  {
    title: "Luxury Sky Penthouse",
    description:
      "Relax in a premium penthouse featuring a rooftop pool, panoramic skyline views, and world-class amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    },
    price: 6500,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "luxury",
  },
  {
    title: "Historic Colonial Mansion",
    description:
      "Step back in time by staying in this beautifully restored colonial mansion filled with timeless elegance.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=60",
    },
    price: 2900,
    location: "Jaipur",
    country: "India",
    category: "historic",
  },
  {
    title: "Cliffside Sunset Villa",
    description:
      "Witness unforgettable sunsets from this spectacular cliffside villa overlooking the endless sea.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
    },
    price: 4700,
    location: "Santorini",
    country: "Greece",
    category: "amazing-views",
  },
  {
    title: "Trending Downtown Loft",
    description:
      "A stylish loft located in the city's most vibrant neighborhood with cafes, nightlife, and shopping nearby.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60",
    },
    price: 2600,
    location: "Singapore",
    country: "Singapore",
    category: "trending",
  },
  {
    title: "Island Beach Cottage",
    description:
      "Spend your vacation in a peaceful beach cottage surrounded by turquoise waters and palm trees.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    },
    price: 3100,
    location: "Bora Bora",
    country: "French Polynesia",
    category: "islands",
  },
  {
    title: "Rocky Mountain Cabin",
    description:
      "A warm wooden cabin nestled in the Rockies with breathtaking mountain scenery all around.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 2300,
    location: "Colorado",
    country: "United States",
    category: "mountains",
  },
  {
    title: "Royal Desert Palace",
    description:
      "Experience luxury in a magnificent palace inspired by traditional desert architecture.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60",
    },
    price: 5600,
    location: "Abu Dhabi",
    country: "United Arab Emirates",
    category: "desert",
  },
  {
    title: "Luxury Farm Estate",
    description:
      "Escape to a peaceful countryside estate featuring vineyards, gardens, and premium farmhouse accommodation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
    },
    price: 2400,
    location: "Tuscany",
    country: "Italy",
    category: "farms",
  },
  {
    title: "Glass Treehouse Retreat",
    description:
      "Sleep beneath the stars in a stunning glass treehouse surrounded by lush forests and wildlife.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Ubud",
    country: "Indonesia",
    category: "treehouses",
  },
];

module.exports = { data: sampleListings };
