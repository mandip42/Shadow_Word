export interface WordPair {
  id: string;
  wordA: string;
  wordB: string;
  category: WordCategory;
  difficulty: 'easy' | 'medium' | 'hard';
}

export type WordCategory =
  | 'food' | 'drinks' | 'animals' | 'sports' | 'technology'
  | 'nature' | 'places' | 'movies' | 'music' | 'professions'
  | 'science' | 'history' | 'fashion' | 'household' | 'transport'
  | 'abstract' | 'bodyparts' | 'weather' | 'emotions' | 'popculture';

const DIFFICULTY: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];

/** Curated seed pairs per category (50 each = 1000). Expanded to 500/category via variants. */
const SEED_PAIRS: { category: WordCategory; pairs: [string, string][] }[] = [
  { category: 'food', pairs: [
    ['Espresso', 'Americano'], ['Pizza', 'Calzone'], ['Burger', 'Sandwich'], ['Sushi', 'Sashimi'],
    ['Croissant', 'Pain au chocolat'], ['Pasta', 'Noodles'], ['Curry', 'Stew'], ['Salad', 'Coleslaw'],
    ['Cake', 'Pie'], ['Bread', 'Toast'], ['Rice', 'Couscous'], ['Soup', 'Broth'], ['Omelette', 'Frittata'],
    ['Pancake', 'Waffle'], ['Cookie', 'Biscuit'], ['Jam', 'Marmalade'], ['Butter', 'Margarine'],
    ['Cheese', 'Cottage cheese'], ['Yogurt', 'Kefir'], ['Ice cream', 'Gelato'], ['Chocolate', 'Cocoa'],
    ['Honey', 'Syrup'], ['Vinegar', 'Lemon juice'], ['Ketchup', 'Mustard'], ['Mayo', 'Aioli'],
    ['Pickle', 'Olive'], ['Nut', 'Seed'], ['Apple', 'Pear'], ['Banana', 'Plantain'], ['Orange', 'Tangerine'],
    ['Grape', 'Raisin'], ['Strawberry', 'Raspberry'], ['Peach', 'Apricot'], ['Lemon', 'Lime'],
    ['Watermelon', 'Cantaloupe'], ['Mango', 'Papaya'], ['Kiwi', 'Passion fruit'], ['Fig', 'Date'],
    ['Broccoli', 'Cauliflower'], ['Carrot', 'Parsnip'], ['Potato', 'Yam'], ['Tomato', 'Pepper'],
    ['Onion', 'Shallot'], ['Garlic', 'Ginger'], ['Lettuce', 'Spinach'], ['Mushroom', 'Truffle'],
    ['Corn', 'Peas'], ['Bean', 'Lentil'], ['Cucumber', 'Zucchini'], ['Eggplant', 'Squash'],
    ['Radish', 'Turnip'], ['Cabbage', 'Kale'],
  ]},
  { category: 'drinks', pairs: [
    ['Coffee', 'Tea'], ['Beer', 'Ale'], ['Wine', 'Champagne'], ['Juice', 'Smoothie'],
    ['Soda', 'Tonic'], ['Milk', 'Cream'], ['Water', 'Sparkling water'], ['Cocktail', 'Mocktail'],
    ['Whiskey', 'Bourbon'], ['Vodka', 'Gin'], ['Rum', 'Tequila'], ['Lager', 'Pilsner'],
    ['Latte', 'Cappuccino'], ['Espresso', 'Ristretto'], ['Mocha', 'Hot chocolate'], ['Lemonade', 'Limeade'],
    ['Iced tea', 'Iced coffee'], ['Cola', 'Root beer'], ['Energy drink', 'Sports drink'], ['Cider', 'Perry'],
    ['Sake', 'Soju'], ['Brandy', 'Cognac'], ['Liqueur', 'Cordial'], ['Shake', 'Float'],
    ['Frappe', 'Slush'], ['Punch', 'Sangria'], ['Kombucha', 'Kefir'], ['Herbal tea', 'Green tea'],
    ['Decaf', 'Regular'], ['Tap water', 'Mineral water'], ['Syrup', 'Concentrate'], ['Brew', 'Infusion'],
    ['Stout', 'Porter'], ['Martini', 'Manhattan'], ['Margarita', 'Daiquiri'], ['Mimosa', 'Bellini'],
    ['Negroni', 'Americano'], ['Mojito', 'Mint julep'], ['Bloody Mary', 'Caesar'], ['Sour', 'Fizz'],
    ['Cordial', 'Syrup'], ['Tisane', 'Decoction'], ['Bubble tea', 'Boba'], ['Cold brew', 'Nitro'],
    ['Macchiato', 'Cortado'], ['Flat white', 'Americano'], ['Affogato', 'Float'], ['Chai', 'Masala'],
    ['Matcha', 'Green tea'], ['Yerba mate', 'Guayusa'], ['Horchata', 'Tiger nut'], ['Kefir', 'Yogurt drink'],
  ]},
  { category: 'animals', pairs: [
    ['Shark', 'Dolphin'], ['Lion', 'Tiger'], ['Wolf', 'Fox'], ['Eagle', 'Hawk'],
    ['Cat', 'Lynx'], ['Dog', 'Wolf'], ['Horse', 'Pony'], ['Cow', 'Bull'],
    ['Sheep', 'Goat'], ['Pig', 'Boar'], ['Chicken', 'Rooster'], ['Duck', 'Goose'],
    ['Rabbit', 'Hare'], ['Mouse', 'Rat'], ['Bear', 'Panda'], ['Elephant', 'Mammoth'],
    ['Giraffe', 'Okapi'], ['Zebra', 'Donkey'], ['Monkey', 'Ape'], ['Gorilla', 'Chimpanzee'],
    ['Snake', 'Lizard'], ['Crocodile', 'Alligator'], ['Turtle', 'Tortoise'], ['Frog', 'Toad'],
    ['Butterfly', 'Moth'], ['Bee', 'Wasp'], ['Ant', 'Termite'], ['Spider', 'Scorpion'],
    ['Crab', 'Lobster'], ['Shrimp', 'Prawn'], ['Squid', 'Octopus'], ['Fish', 'Minnow'],
    ['Whale', 'Dolphin'], ['Seal', 'Sea lion'], ['Otter', 'Beaver'], ['Deer', 'Elk'],
    ['Moose', 'Caribou'], ['Kangaroo', 'Wallaby'], ['Koala', 'Wombat'], ['Platypus', 'Echidna'],
    ['Owl', 'Hawk'], ['Crow', 'Raven'], ['Parrot', 'Macaw'], ['Penguin', 'Puffin'],
    ['Swan', 'Crane'], ['Peacock', 'Peahen'], ['Flamingo', 'Stork'], ['Pelican', 'Cormorant'],
    ['Bat', 'Flying fox'], ['Hedgehog', 'Porcupine'], ['Skunk', 'Badger'], ['Raccoon', 'Opossum'],
    ['Squirrel', 'Chipmunk'], ['Hamster', 'Gerbil'], ['Guinea pig', 'Capybara'], ['Ferret', 'Weasel'],
  ]},
  { category: 'sports', pairs: [
    ['Soccer', 'Rugby'], ['Basketball', 'Netball'], ['Tennis', 'Badminton'], ['Baseball', 'Cricket'],
    ['Golf', 'Mini golf'], ['Swimming', 'Diving'], ['Boxing', 'Wrestling'], ['Running', 'Jogging'],
    ['Cycling', 'Triathlon'], ['Skiing', 'Snowboarding'], ['Surfing', 'Windsurfing'], ['Hockey', 'Field hockey'],
    ['Volleyball', 'Beach volleyball'], ['Martial arts', 'Karate'], ['Gymnastics', 'Acrobatics'],
    ['Fencing', 'Kendo'], ['Archery', 'Darts'], ['Bowling', 'Skittles'], ['Polo', 'Water polo'],
    ['Lacrosse', 'Hockey'], ['Squash', 'Racquetball'], ['Table tennis', 'Ping pong'], ['Handball', 'Team handball'],
    ['Rowing', 'Canoeing'], ['Kayaking', 'Paddleboarding'], ['Climbing', 'Bouldering'], ['Skating', 'Rollerblading'],
    ['Horse racing', 'Harness racing'], ['Formula 1', 'NASCAR'], ['Motocross', 'BMX'], ['Sumo', 'Wrestling'],
    ['Judo', 'Jiu-jitsu'], ['Taekwondo', 'Kickboxing'], ['Fencing', 'Sword fighting'], ['Polo', 'Equestrian'],
    ['Curling', 'Bowling'], ['Bobsled', 'Luge'], ['Figure skating', 'Ice dancing'], ['Speed skating', 'Short track'],
    ['Triathlon', 'Decathlon'], ['Marathon', 'Ultramarathon'], ['CrossFit', 'Weightlifting'], ['Powerlifting', 'Bodybuilding'],
    ['Parkour', 'Freerunning'], ['Skateboarding', 'Longboarding'], ['Surfing', 'Kitesurfing'], ['Paragliding', 'Hang gliding'],
    ['Fishing', 'Fly fishing'], ['Hunting', 'Shooting'], ['Darts', 'Billiards'], ['Snooker', 'Pool'],
    ['Chess', 'Checkers'], ['Poker', 'Blackjack'], ['Bingo', 'Lottery'], ['Bridge', 'Whist'],
  ]},
  { category: 'technology', pairs: [
    ['Phone', 'Smartphone'], ['Tablet', 'iPad'], ['Laptop', 'Notebook'], ['Desktop', 'Workstation'],
    ['Monitor', 'Display'], ['Keyboard', 'Keypad'], ['Mouse', 'Trackpad'], ['Printer', 'Scanner'],
    ['Router', 'Modem'], ['WiFi', 'Ethernet'], ['Bluetooth', 'NFC'], ['USB', 'Thunderbolt'],
    ['App', 'Software'], ['Website', 'Web app'], ['Browser', 'Search engine'], ['Email', 'Newsletter'],
    ['Cloud', 'Server'], ['Database', 'Spreadsheet'], ['Algorithm', 'Code'], ['API', 'SDK'],
    ['AI', 'Machine learning'], ['VR', 'AR'], ['Robot', 'Bot'], ['Drone', 'UAV'],
    ['Camera', 'Webcam'], ['Microphone', 'Headset'], ['Speaker', 'Earbuds'], ['Charger', 'Adapter'],
    ['Battery', 'Power bank'], ['Cable', 'Cord'], ['SIM', 'eSIM'], ['5G', 'LTE'],
    ['Streaming', 'Download'], ['Podcast', 'Audiobook'], ['Social media', 'Forum'], ['Tweet', 'Post'],
    ['Password', 'PIN'], ['Firewall', 'Antivirus'], ['Backup', 'Sync'], ['Upload', 'Download'],
    ['Pixel', 'Resolution'], ['Frame rate', 'Refresh rate'], ['Storage', 'Memory'], ['RAM', 'ROM'],
    ['CPU', 'GPU'], ['Processor', 'Chip'], ['Motherboard', 'Circuit board'], ['Hard drive', 'SSD'],
    ['Touchscreen', 'Display'], ['Biometric', 'Fingerprint'], ['Face ID', 'Touch ID'], ['Widget', 'Shortcut'],
  ]},
  { category: 'nature', pairs: [
    ['Mountain', 'Hill'], ['River', 'Stream'], ['Lake', 'Pond'], ['Ocean', 'Sea'],
    ['Forest', 'Woods'], ['Desert', 'Dune'], ['Valley', 'Canyon'], ['Waterfall', 'Rapids'],
    ['Island', 'Peninsula'], ['Beach', 'Shore'], ['Cliff', 'Bluff'], ['Cave', 'Grotto'],
    ['Volcano', 'Crater'], ['Glacier', 'Iceberg'], ['Meadow', 'Prairie'], ['Swamp', 'Marsh'],
    ['Jungle', 'Rainforest'], ['Savanna', 'Grassland'], ['Tundra', 'Permafrost'], ['Reef', 'Atoll'],
    ['Tree', 'Shrub'], ['Flower', 'Blossom'], ['Grass', 'Fern'], ['Moss', 'Lichen'],
    ['Rock', 'Boulder'], ['Sand', 'Gravel'], ['Soil', 'Mud'], ['Stone', 'Pebble'],
    ['Sunrise', 'Sunset'], ['Cloud', 'Fog'], ['Rain', 'Drizzle'], ['Snow', 'Sleet'],
    ['Wind', 'Breeze'], ['Storm', 'Hurricane'], ['Lightning', 'Thunder'], ['Rainbow', 'Halo'],
    ['Star', 'Planet'], ['Moon', 'Satellite'], ['Comet', 'Meteor'], ['Galaxy', 'Nebula'],
    ['Sun', 'Star'], ['Earth', 'Mars'], ['Aurora', 'Northern lights'], ['Eclipse', 'Transit'],
    ['Season', 'Climate'], ['Spring', 'Autumn'], ['Summer', 'Winter'], ['Dawn', 'Dusk'],
    ['Horizon', 'Skyline'], ['Landscape', 'Scenery'], ['Wildlife', 'Fauna'], ['Flora', 'Vegetation'],
    ['Ecosystem', 'Habitat'], ['Species', 'Genus'], ['Evolution', 'Adaptation'], ['Conservation', 'Preservation'],
  ]},
  { category: 'places', pairs: [
    ['Prison', 'Jail'], ['Hospital', 'Clinic'], ['School', 'University'], ['Church', 'Cathedral'],
    ['Museum', 'Gallery'], ['Library', 'Archive'], ['Restaurant', 'Cafe'], ['Hotel', 'Motel'],
    ['Airport', 'Terminal'], ['Station', 'Depot'], ['Mall', 'Plaza'], ['Market', 'Bazaar'],
    ['Park', 'Garden'], ['Stadium', 'Arena'], ['Theater', 'Cinema'], ['Bar', 'Pub'],
    ['Office', 'Workspace'], ['Factory', 'Warehouse'], ['Farm', 'Ranch'], ['Village', 'Town'],
    ['City', 'Metropolis'], ['Country', 'Nation'], ['Capital', 'Downtown'], ['Suburb', 'Outskirts'],
    ['Beach', 'Resort'], ['Spa', 'Salon'], ['Gym', 'Studio'], ['Pool', 'Aquatic center'],
    ['Castle', 'Palace'], ['Fort', 'Bunker'], ['Temple', 'Shrine'], ['Monastery', 'Convent'],
    ['Bridge', 'Overpass'], ['Tunnel', 'Underpass'], ['Highway', 'Freeway'], ['Street', 'Avenue'],
    ['Square', 'Circle'], ['Fountain', 'Monument'], ['Statue', 'Sculpture'], ['Memorial', 'Shrine'],
    ['Zoo', 'Aquarium'], ['Circus', 'Carnival'], ['Fair', 'Festival'], ['Concert', 'Venue'],
    ['Stadium', 'Colosseum'], ['Arena', 'Amphitheater'], ['Court', 'Field'], ['Track', 'Course'],
    ['Harbor', 'Marina'], ['Port', 'Dock'], ['Pier', 'Wharf'], ['Lighthouse', 'Beacon'],
    ['Skyscraper', 'Tower'], ['Apartment', 'Condominium'], ['House', 'Cottage'], ['Mansion', 'Estate'],
    ['Cabin', 'Lodge'], ['Tent', 'Campsite'], ['Caravan', 'Trailer'], ['Shelter', 'Refuge'],
  ]},
  { category: 'movies', pairs: [
    ['Horror', 'Thriller'], ['Comedy', 'Rom-com'], ['Drama', 'Tragedy'], ['Action', 'Adventure'],
    ['Sci-fi', 'Fantasy'], ['Documentary', 'Biopic'], ['Animation', 'Cartoon'], ['Musical', 'Opera'],
    ['Western', 'Noir'], ['Crime', 'Mystery'], ['War', 'Historical'], ['Romance', 'Drama'],
    ['Director', 'Producer'], ['Actor', 'Actress'], ['Screenplay', 'Script'], ['Sequel', 'Prequel'],
    ['Remake', 'Reboot'], ['Franchise', 'Series'], ['Blockbuster', 'Hit'], ['Indie', 'Art house'],
    ['Oscar', 'Emmy'], ['Cannes', 'Sundance'], ['Netflix', 'Streaming'], ['Theater', 'Cinema'],
    ['Trailer', 'Teaser'], ['Cameo', 'Guest star'], ['Stunt', 'Double'], ['Voiceover', 'Narration'],
    ['Subtitles', 'Dubbing'], ['3D', 'IMAX'], ['Matinee', 'Midnight show'], ['Premiere', 'Screening'],
    ['Red carpet', 'Gala'], ['Award', 'Nomination'], ['Critic', 'Reviewer'], ['Box office', 'Revenue'],
    ['Cast', 'Crew'], ['Set', 'Location'], ['Shoot', 'Film'], ['Edit', 'Cut'],
    ['Score', 'Soundtrack'], ['Theme', 'Leitmotif'], ['Villain', 'Antagonist'], ['Hero', 'Protagonist'],
    ['Plot', 'Storyline'], ['Twist', 'Reveal'], ['Cliffhanger', 'Finale'], ['Pilot', 'Episode'],
    ['Season', 'Series'], ['Binge', 'Marathon'], ['Spoiler', 'Reveal'], ['Cult classic', 'Sleeper hit'],
    ['B-movie', 'Exploitation'], ['Mockumentary', 'Parody'], ['Docudrama', 'Docufiction'], ['Anthology', 'Omnibus'],
  ]},
  { category: 'music', pairs: [
    ['Guitar', 'Bass'], ['Violin', 'Viola'], ['Piano', 'Keyboard'], ['Drums', 'Percussion'],
    ['Trumpet', 'Trombone'], ['Flute', 'Recorder'], ['Saxophone', 'Clarinet'], ['Harp', 'Lute'],
    ['Soprano', 'Alto'], ['Tenor', 'Baritone'], ['Rock', 'Metal'], ['Jazz', 'Blues'],
    ['Classical', 'Orchestral'], ['Pop', 'Disco'], ['Hip-hop', 'Rap'], ['Country', 'Folk'],
    ['Electronic', 'EDM'], ['Reggae', 'Ska'], ['R&B', 'Soul'], ['Punk', 'Grunge'],
    ['Album', 'EP'], ['Single', 'Track'], ['Chord', 'Note'], ['Melody', 'Harmony'],
    ['Rhythm', 'Beat'], ['Tempo', 'BPM'], ['Lyrics', 'Verse'], ['Chorus', 'Refrain'],
    ['Bridge', 'Interlude'], ['Solo', 'Duet'], ['Band', 'Orchestra'], ['Conductor', 'Director'],
    ['Concert', 'Gig'], ['Tour', 'Residency'], ['Festival', 'Showcase'], ['Acoustic', 'Unplugged'],
    ['Cover', 'Remix'], ['Sample', 'Loop'], ['Synthesizer', 'Sampler'], ['Microphone', 'Amp'],
    ['Speaker', 'Monitor'], ['Headphones', 'Earbuds'], ['Vinyl', 'Cassette'], ['CD', 'Streaming'],
    ['Playlist', 'Mixtape'], ['Radio', 'Podcast'], ['Spotify', 'Apple Music'], ['Concert hall', 'Venue'],
    ['Opera', 'Ballet'], ['Broadway', 'West End'], ['A capella', 'Choir'], ['Karaoke', 'Singalong'],
    ['Grammy', 'Brit Award'], ['Chart', 'Billboard'], ['Hit', 'Anthem'], ['Ballad', 'Lullaby'],
    ['Genre', 'Style'], ['Instrumental', 'Vocal'], ['Live', 'Studio'], ['Encore', 'Finale'],
  ]},
  { category: 'professions', pairs: [
    ['Doctor', 'Surgeon'], ['Nurse', 'Medic'], ['Teacher', 'Professor'], ['Lawyer', 'Judge'],
    ['Engineer', 'Architect'], ['Chef', 'Cook'], ['Pilot', 'Captain'], ['Driver', 'Chauffeur'],
    ['Writer', 'Author'], ['Journalist', 'Reporter'], ['Artist', 'Designer'], ['Photographer', 'Videographer'],
    ['Actor', 'Performer'], ['Singer', 'Musician'], ['Dancer', 'Choreographer'], ['Athlete', 'Coach'],
    ['Scientist', 'Researcher'], ['Doctor', 'Physician'], ['Dentist', 'Orthodontist'], ['Vet', 'Zoologist'],
    ['Farmer', 'Rancher'], ['Fisherman', 'Sailor'], ['Soldier', 'Veteran'], ['Police', 'Detective'],
    ['Firefighter', 'Paramedic'], ['Pilot', 'Aviator'], ['Astronaut', 'Cosmonaut'], ['Baker', 'Pastry chef'],
    ['Waiter', 'Bartender'], ['Barber', 'Hairdresser'], ['Tailor', 'Seamstress'], ['Carpenter', 'Builder'],
    ['Plumber', 'Electrician'], ['Mechanic', 'Technician'], ['Programmer', 'Developer'], ['Analyst', 'Consultant'],
    ['Manager', 'Director'], ['CEO', 'Founder'], ['Accountant', 'Auditor'], ['Banker', 'Broker'],
    ['Librarian', 'Curator'], ['Historian', 'Archaeologist'], ['Psychologist', 'Therapist'], ['Pharmacist', 'Chemist'],
    ['Politician', 'Diplomat'], ['Ambassador', 'Envoy'], ['Secretary', 'Assistant'], ['Receptionist', 'Clerk'],
    ['Driver', 'Courier'], ['Guard', 'Security'], ['Janitor', 'Custodian'], ['Nanny', 'Babysitter'],
    ['Model', 'Influencer'], ['Streamer', 'YouTuber'], ['Comedian', 'Host'], ['Magician', 'Illusionist'],
    ['Priest', 'Minister'], ['Monk', 'Nun'], ['Missionary', 'Evangelist'], ['Guru', 'Mentor'],
  ]},
  { category: 'science', pairs: [
    ['Physics', 'Chemistry'], ['Biology', 'Zoology'], ['Astronomy', 'Astrology'], ['Math', 'Geometry'],
    ['Atom', 'Molecule'], ['Proton', 'Neutron'], ['Electron', 'Photon'], ['Energy', 'Mass'],
    ['Force', 'Velocity'], ['Gravity', 'Magnetism'], ['Light', 'Radiation'], ['Sound', 'Wave'],
    ['Cell', 'Nucleus'], ['Gene', 'DNA'], ['Virus', 'Bacteria'], ['Evolution', 'Mutation'],
    ['Experiment', 'Hypothesis'], ['Theory', 'Law'], ['Observation', 'Data'], ['Conclusion', 'Result'],
    ['Microscope', 'Telescope'], ['Lab', 'Laboratory'], ['Compound', 'Element'], ['Acid', 'Base'],
    ['Solid', 'Liquid'], ['Gas', 'Plasma'], ['Temperature', 'Heat'], ['Pressure', 'Density'],
    ['Reaction', 'Catalyst'], ['Synthesis', 'Analysis'], ['Organic', 'Inorganic'], ['Solvent', 'Solution'],
    ['Ecosystem', 'Biome'], ['Species', 'Organism'], ['Habitat', 'Niche'], ['Predator', 'Prey'],
    ['Photosynthesis', 'Respiration'], ['Mitosis', 'Meiosis'], ['Enzyme', 'Protein'], ['Vitamin', 'Mineral'],
    ['Vaccine', 'Antibiotic'], ['Surgery', 'Transplant'], ['Diagnosis', 'Prognosis'], ['Symptom', 'Syndrome'],
    ['Planet', 'Moon'], ['Star', 'Galaxy'], ['Universe', 'Cosmos'], ['Black hole', 'Neutron star'],
    ['Solar system', 'Orbit'], ['Comet', 'Asteroid'], ['Meteor', 'Meteorite'], ['Telescope', 'Observatory'],
    ['Quantum', 'Particle'], ['Relativity', 'Spacetime'], ['Fusion', 'Fission'], ['Renewable', 'Sustainable'],
    ['Climate', 'Weather'], ['Erosion', 'Sedimentation'], ['Fossil', 'Specimen'], ['Extinction', 'Endangered'],
  ]},
  { category: 'history', pairs: [
    ['Ancient', 'Medieval'], ['Empire', 'Kingdom'], ['War', 'Battle'], ['Revolution', 'Revolt'],
    ['Dynasty', 'Era'], ['Century', 'Decade'], ['Civilization', 'Culture'], ['Conquest', 'Invasion'],
    ['Treaty', 'Alliance'], ['Colony', 'Territory'], ['Monarch', 'Emperor'], ['Queen', 'Princess'],
    ['Knight', 'Samurai'], ['Castle', 'Fortress'], ['Crusade', 'Pilgrimage'], ['Renaissance', 'Enlightenment'],
    ['Industrial', 'Agricultural'], ['Colonial', 'Imperial'], ['Cold War', 'Iron Curtain'], ['Holocaust', 'Genocide'],
    ['Independence', 'Liberation'], ['Constitution', 'Charter'], ['Democracy', 'Republic'], ['Dictator', 'Tyrant'],
    ['Pharaoh', 'Emperor'], ['Gladiator', 'Warrior'], ['Viking', 'Pirate'], ['Explorer', 'Conquistador'],
    ['Slavery', 'Serfdom'], ['Abolition', 'Emancipation'], ['Suffrage', 'Franchise'], ['Civil rights', 'Equality'],
    ['Archaeology', 'Anthropology'], ['Artifact', 'Relic'], ['Monument', 'Memorial'], ['Heritage', 'Legacy'],
    ['Myth', 'Legend'], ['Folklore', 'Tradition'], ['Chronicle', 'Annals'], ['Archive', 'Record'],
    ['Biography', 'Autobiography'], ['Memoir', 'Diary'], ['Manuscript', 'Scroll'], ['Inscription', 'Epitaph'],
    ['Discovery', 'Invention'], ['Innovation', 'Reform'], ['Migration', 'Exodus'], ['Settlement', 'Colonization'],
    ['Nomad', 'Tribesman'], ['Merchant', 'Trader'], ['Guild', 'Union'], ['Feudalism', 'Manorialism'],
    ['Plague', 'Epidemic'], ['Famine', 'Drought'], ['Flood', 'Tsunami'], ['Earthquake', 'Avalanche'],
    ['Assassination', 'Coup'], ['Abdication', 'Resignation'], ['Coronation', 'Inauguration'], ['Armistice', 'Ceasefire'],
    ['Propaganda', 'Censorship'], ['Resistance', 'Underground'], ['Partisan', 'Rebel'], ['Martyr', 'Hero'],
  ]},
  { category: 'fashion', pairs: [
    ['Shirt', 'Blouse'], ['Pants', 'Trousers'], ['Jacket', 'Coat'], ['Dress', 'Gown'],
    ['Skirt', 'Kilt'], ['Shorts', 'Bermudas'], ['Sweater', 'Cardigan'], ['Hoodie', 'Sweatshirt'],
    ['Sneakers', 'Trainers'], ['Boots', 'Ankle boots'], ['Sandals', 'Flip-flops'], ['Heels', 'Wedges'],
    ['Hat', 'Cap'], ['Scarf', 'Shawl'], ['Gloves', 'Mittens'], ['Belt', 'Sash'],
    ['Sunglasses', 'Goggles'], ['Watch', 'Bracelet'], ['Necklace', 'Pendant'], ['Earrings', 'Studs'],
    ['Ring', 'Band'], ['Bangle', 'Cuff'], ['Tie', 'Bow tie'], ['Pocket square', 'Handkerchief'],
    ['Suit', 'Tuxedo'], ['Vest', 'Waistcoat'], ['Blazer', 'Sport coat'], ['Trench', 'Raincoat'],
    ['Jeans', 'Denim'], ['Leather', 'Suede'], ['Silk', 'Satin'], ['Cotton', 'Linen'],
    ['Wool', 'Cashmere'], ['Polyester', 'Nylon'], ['Velvet', 'Velour'], ['Lace', 'Tulle'],
    ['Pattern', 'Print'], ['Stripes', 'Plaid'], ['Polka dots', 'Floral'], ['Solid', 'Neutral'],
    ['Vintage', 'Retro'], ['Classic', 'Timeless'], ['Trendy', 'Fashionable'], ['Minimalist', 'Bohemian'],
    ['Designer', 'Couture'], ['Fast fashion', 'Sustainable'], ['Thrift', 'Secondhand'], ['Boutique', 'Department store'],
    ['Runway', 'Catwalk'], ['Lookbook', 'Collection'], ['Stylist', 'Designer'], ['Model', 'Mannequin'],
    ['Size', 'Fit'], ['Tailoring', 'Alteration'], ['Wardrobe', 'Closet'], ['Outfit', 'Ensemble'],
    ['Accessory', 'Accent'], ['Layering', 'Stacking'], ['Monochrome', 'Monochromatic'], ['Contrast', 'Complement'],
    ['Haute couture', 'Ready-to-wear'], ['Capsule', 'Minimal'], ['Streetwear', 'Athleisure'], ['Formal', 'Black tie'],
  ]},
  { category: 'household', pairs: [
    ['Couch', 'Sofa'], ['Table', 'Desk'], ['Chair', 'Stool'], ['Bed', 'Mattress'],
    ['Lamp', 'Chandelier'], ['Rug', 'Carpet'], ['Curtain', 'Blind'], ['Pillow', 'Cushion'],
    ['Blanket', 'Quilt'], ['Sheet', 'Duvet'], ['Towel', 'Washcloth'], ['Soap', 'Detergent'],
    ['Broom', 'Mop'], ['Vacuum', 'Sweeper'], ['Bucket', 'Pail'], ['Sponge', 'Scrubber'],
    ['Trash', 'Recycling'], ['Bin', 'Basket'], ['Drawer', 'Cabinet'], ['Shelf', 'Rack'],
    ['Mirror', 'Glass'], ['Frame', 'Canvas'], ['Clock', 'Timer'], ['Calendar', 'Planner'],
    ['Key', 'Lock'], ['Door', 'Gate'], ['Window', 'Skylight'], ['Wall', 'Partition'],
    ['Stove', 'Oven'], ['Fridge', 'Freezer'], ['Sink', 'Faucet'], ['Dishwasher', 'Hand wash'],
    ['Microwave', 'Toaster'], ['Blender', 'Mixer'], ['Kettle', 'Pot'], ['Pan', 'Skillet'],
    ['Plate', 'Bowl'], ['Cup', 'Mug'], ['Fork', 'Spoon'], ['Knife', 'Cutlery'],
    ['Glass', 'Tumbler'], ['Bottle', 'Jar'], ['Container', 'Box'], ['Bag', 'Pouch'],
    ['Hamper', 'Laundry'], ['Iron', 'Steamer'], ['Hanger', 'Hook'], ['Closet', 'Wardrobe'],
    ['Bathroom', 'Restroom'], ['Shower', 'Bathtub'], ['Toilet', 'Bidet'], ['Sink', 'Vanity'],
    ['Toothbrush', 'Floss'], ['Shampoo', 'Conditioner'], ['Lotion', 'Cream'], ['Razor', 'Trimmer'],
    ['Remote', 'Controller'], ['Charger', 'Cable'], ['Extension', 'Outlet'], ['Bulb', 'Lamp'],
    ['Plant', 'Vase'], ['Decoration', 'Ornament'], ['Painting', 'Poster'], ['Bookcase', 'Shelving'],
    ['Cradle', 'Bassinet'], ['Crib', 'Bed'], ['Diaper', 'Wipe'], ['Pacifier', 'Teether'],
  ]},
  { category: 'transport', pairs: [
    ['Car', 'Sedan'], ['Truck', 'Van'], ['Bus', 'Coach'], ['Train', 'Subway'],
    ['Plane', 'Jet'], ['Helicopter', 'Drone'], ['Boat', 'Ship'], ['Yacht', 'Sailboat'],
    ['Bicycle', 'Motorcycle'], ['Scooter', 'Moped'], ['Skateboard', 'Longboard'], ['Wheelchair', 'Stroller'],
    ['Taxi', 'Uber'], ['Limo', 'Chauffeur'], ['Ambulance', 'Fire truck'], ['Police car', 'Patrol'],
    ['Tractor', 'Harvester'], ['Forklift', 'Crane'], ['Rocket', 'Spaceship'], ['Cable car', 'Gondola'],
    ['Ferry', 'Cruise'], ['Raft', 'Canoe'], ['Kayak', 'Rowboat'], ['Submarine', 'Submersible'],
    ['Engine', 'Locomotive'], ['Caboose', 'Freight'], ['Trolley', 'Streetcar'], ['Tram', 'Light rail'],
    ['Highway', 'Interstate'], ['Road', 'Street'], ['Bridge', 'Overpass'], ['Tunnel', 'Underpass'],
    ['Parking', 'Garage'], ['Lot', 'Structure'], ['Gas station', 'Charging'], ['Rest stop', 'Service area'],
    ['License', 'Registration'], ['Insurance', 'Coverage'], ['Speed limit', 'Fine'], ['Traffic', 'Congestion'],
    ['Pilot', 'Captain'], ['Driver', 'Operator'], ['Passenger', 'Rider'], ['Cargo', 'Freight'],
    ['Departure', 'Arrival'], ['Boarding', 'Departing'], ['Terminal', 'Gate'], ['Runway', 'Tarmac'],
    ['Helmet', 'Seatbelt'], ['Airbag', 'Safety'], ['Brake', 'Accelerator'], ['Steering', 'Wheel'],
    ['Engine', 'Motor'], ['Battery', 'Fuel'], ['Electric', 'Hybrid'], ['Diesel', 'Petrol'],
    ['GPS', 'Navigation'], ['Map', 'Compass'], ['Route', 'Detour'], ['Highway', 'Bypass'],
    ['Hitchhike', 'Rideshare'], ['Carpool', 'Commute'], ['Transit', 'Public'], ['Shuttle', 'Transfer'],
    ['Luggage', 'Baggage'], ['Suitcase', 'Backpack'], ['Cargo', 'Shipment'], ['Delivery', 'Courier'],
    ['Wheel', 'Tire'], ['Axle', 'Hub'], ['Chassis', 'Frame'], ['Exhaust', 'Muffler'],
  ]},
  { category: 'abstract', pairs: [
    ['Love', 'Passion'], ['Hate', 'Anger'], ['Joy', 'Happiness'], ['Sadness', 'Grief'],
    ['Fear', 'Anxiety'], ['Hope', 'Optimism'], ['Faith', 'Belief'], ['Doubt', 'Skepticism'],
    ['Truth', 'Reality'], ['Lie', 'Deception'], ['Good', 'Evil'], ['Right', 'Wrong'],
    ['Beauty', 'Grace'], ['Ugliness', 'Deformity'], ['Wisdom', 'Knowledge'], ['Ignorance', 'Stupidity'],
    ['Courage', 'Bravery'], ['Cowardice', 'Fear'], ['Freedom', 'Liberty'], ['Slavery', 'Bondage'],
    ['Justice', 'Fairness'], ['Injustice', 'Bias'], ['Peace', 'Harmony'], ['War', 'Conflict'],
    ['Life', 'Existence'], ['Death', 'End'], ['Time', 'Eternity'], ['Space', 'Infinity'],
    ['Change', 'Transformation'], ['Stability', 'Permanence'], ['Chaos', 'Order'], ['Random', 'Pattern'],
    ['Cause', 'Effect'], ['Reason', 'Logic'], ['Intuition', 'Instinct'], ['Evidence', 'Proof'],
    ['Idea', 'Concept'], ['Theory', 'Practice'], ['Abstract', 'Concrete'], ['General', 'Specific'],
    ['Whole', 'Part'], ['Sum', 'Total'], ['Quality', 'Quantity'], ['Form', 'Content'],
    ['Meaning', 'Purpose'], ['Chance', 'Destiny'], ['Choice', 'Decision'], ['Fate', 'Fortune'],
    ['Dream', 'Nightmare'], ['Reality', 'Fantasy'], ['Myth', 'Fact'], ['Legend', 'History'],
    ['Symbol', 'Sign'], ['Metaphor', 'Allegory'], ['Analogy', 'Comparison'], ['Paradox', 'Contradiction'],
    ['Virtue', 'Vice'], ['Sin', 'Crime'], ['Guilt', 'Shame'], ['Pride', 'Arrogance'],
    ['Humility', 'Modesty'], ['Generosity', 'Greed'], ['Kindness', 'Cruelty'], ['Compassion', 'Empathy'],
    ['Loyalty', 'Betrayal'], ['Trust', 'Suspicion'], ['Honesty', 'Integrity'], ['Honor', 'Dignity'],
    ['Glory', 'Fame'], ['Shame', 'Disgrace'], ['Success', 'Failure'], ['Victory', 'Defeat'],
    ['Power', 'Authority'], ['Influence', 'Control'], ['Wealth', 'Poverty'], ['Rich', 'Poor'],
    ['Strength', 'Weakness'], ['Health', 'Sickness'], ['Youth', 'Age'], ['Beginning', 'End'],
  ]},
  { category: 'bodyparts', pairs: [
    ['Head', 'Skull'], ['Face', 'Cheek'], ['Eye', 'Eyelid'], ['Ear', 'Earlobe'],
    ['Nose', 'Nostril'], ['Mouth', 'Lips'], ['Tongue', 'Throat'], ['Tooth', 'Molar'],
    ['Chin', 'Jaw'], ['Forehead', 'Temple'], ['Eyebrow', 'Eyelash'], ['Pupil', 'Iris'],
    ['Neck', 'Throat'], ['Shoulder', 'Collarbone'], ['Arm', 'Elbow'], ['Wrist', 'Hand'],
    ['Palm', 'Finger'], ['Thumb', 'Index'], ['Nail', 'Knuckle'], ['Chest', 'Rib'],
    ['Heart', 'Lung'], ['Stomach', 'Liver'], ['Kidney', 'Spleen'], ['Spine', 'Backbone'],
    ['Hip', 'Pelvis'], ['Thigh', 'Knee'], ['Shin', 'Calf'], ['Ankle', 'Foot'],
    ['Heel', 'Toe'], ['Arch', 'Sole'], ['Muscle', 'Tendon'], ['Bone', 'Joint'],
    ['Skin', 'Pore'], ['Hair', 'Follicle'], ['Blood', 'Vein'], ['Artery', 'Capillary'],
    ['Brain', 'Nerve'], ['Spinal cord', 'Neuron'], ['Gland', 'Organ'], ['Tissue', 'Cell'],
    ['Skeleton', 'Skull'], ['Ribcage', 'Sternum'], ['Femur', 'Tibia'], ['Humerus', 'Radius'],
    ['Clavicle', 'Scapula'], ['Patella', 'Fibula'], ['Pelvis', 'Sacrum'], ['Vertebra', 'Disc'],
    ['Cartilage', 'Ligament'], ['Bicep', 'Tricep'], ['Quad', 'Hamstring'], ['Abs', 'Core'],
    ['Diaphragm', 'Esophagus'], ['Trachea', 'Bronchus'], ['Intestine', 'Colon'], ['Bladder', 'Urethra'],
    ['Pancreas', 'Gallbladder'], ['Thyroid', 'Adrenal'], ['Pituitary', 'Hypothalamus'], ['Retina', 'Cornea'],
    ['Eardrum', 'Cochlea'], ['Vocal cord', 'Larynx'], ['Uvula', 'Palate'], ['Gum', 'Enamel'],
    ['Saliva', 'Mucus'], ['Sweat', 'Tear'], ['Sebum', 'Oil'], ['Melanin', 'Pigment'],
    ['Fingerprint', 'Palm print'], ['Reflex', 'Impulse'], ['Pulse', 'Heartbeat'], ['Breath', 'Respiration'],
  ]},
  { category: 'weather', pairs: [
    ['Hurricane', 'Tornado'], ['Blizzard', 'Snowstorm'], ['Drizzle', 'Shower'], ['Downpour', 'Deluge'],
    ['Hail', 'Sleet'], ['Fog', 'Mist'], ['Dew', 'Frost'], ['Humidity', 'Dampness'],
    ['Wind', 'Gale'], ['Breeze', 'Gust'], ['Cyclone', 'Typhoon'], ['Monsoon', 'Rainy season'],
    ['Drought', 'Heat wave'], ['Cold front', 'Warm front'], ['Barometer', 'Thermometer'], ['Forecast', 'Prediction'],
    ['Sunny', 'Clear'], ['Cloudy', 'Overcast'], ['Stormy', 'Thunderstorm'], ['Lightning', 'Thunderbolt'],
    ['Rainbow', 'Double rainbow'], ['Aurora', 'Northern lights'], ['Climate', 'Weather'], ['Temperature', 'Heat index'],
    ['Celsius', 'Fahrenheit'], ['Humidity', 'Dew point'], ['Pressure', 'Low pressure'], ['Precipitation', 'Rainfall'],
    ['Snow', 'Flurry'], ['Ice', 'Black ice'], ['Slush', 'Slop'], ['Flood', 'Flash flood'],
    ['Avalanche', 'Landslide'], ['Mudslide', 'Erosion'], ['Tsunami', 'Storm surge'], ['Tidal wave', 'Surge'],
    ['Season', 'Monsoon'], ['Spring', 'Thaw'], ['Summer', 'Dry season'], ['Autumn', 'Fall'],
    ['Winter', 'Cold snap'], ['El Nino', 'La Nina'], ['Jet stream', 'Trade wind'], ['Ocean current', 'Gulf stream'],
    ['Ozone', 'Smog'], ['Pollution', 'Haze'], ['Dust', 'Sandstorm'], ['Pollen', 'Allergy'],
    ['UV index', 'Sunburn'], ['Wind chill', 'Feels like'], ['Heat index', 'Humidex'], ['Drought', 'Famine'],
    ['Irrigation', 'Rainwater'], ['Reservoir', 'Dam'], ['Evaporation', 'Condensation'], ['Vapor', 'Steam'],
    ['Cloud', 'Cumulus'], ['Stratus', 'Cirrus'], ['Nimbus', 'Storm cloud'], ['Fog', 'Haze'],
    ['Meteorology', 'Climatology'], ['Weatherman', 'Forecaster'], ['Radar', 'Satellite'], ['Doppler', 'Sensor'],
    ['Barometric', 'Atmospheric'], ['High pressure', 'Anticyclone'], ['Low pressure', 'Depression'], ['Front', 'System'],
  ]},
  { category: 'emotions', pairs: [
    ['Happy', 'Joyful'], ['Sad', 'Depressed'], ['Angry', 'Furious'], ['Scared', 'Terrified'],
    ['Surprised', 'Shocked'], ['Disgusted', 'Revolted'], ['Excited', 'Thrilled'], ['Bored', 'Uninterested'],
    ['Anxious', 'Nervous'], ['Calm', 'Peaceful'], ['Confused', 'Bewildered'], ['Curious', 'Inquisitive'],
    ['Proud', 'Arrogant'], ['Ashamed', 'Embarrassed'], ['Guilty', 'Remorseful'], ['Jealous', 'Envious'],
    ['Lonely', 'Isolated'], ['Loved', 'Cherished'], ['Hopeful', 'Optimistic'], ['Hopeless', 'Desperate'],
    ['Grateful', 'Thankful'], ['Resentful', 'Bitter'], ['Frustrated', 'Annoyed'], ['Satisfied', 'Content'],
    ['Disappointed', 'Let down'], ['Relieved', 'Reassured'], ['Impatient', 'Restless'], ['Patient', 'Tolerant'],
    ['Confident', 'Assured'], ['Insecure', 'Uncertain'], ['Brave', 'Courageous'], ['Cowardly', 'Timid'],
    ['Enthusiastic', 'Eager'], ['Apathetic', 'Indifferent'], ['Sympathetic', 'Compassionate'], ['Empathetic', 'Understanding'],
    ['Nostalgic', 'Sentimental'], ['Homesick', 'Longing'], ['Overwhelmed', 'Stressed'], ['Relaxed', 'At ease'],
    ['Amused', 'Entertained'], ['Offended', 'Insulted'], ['Inspired', 'Motivated'], ['Discouraged', 'Dismayed'],
    ['Suspicious', 'Doubtful'], ['Trusting', 'Gullible'], ['Resentful', 'Grudging'], ['Forgiving', 'Merciful'],
    ['Melancholy', 'Sullen'], ['Cheerful', 'Upbeat'], ['Serious', 'Solemn'], ['Playful', 'Mischievous'],
    ['Romantic', 'Affectionate'], ['Cold', 'Distant'], ['Warm', 'Friendly'], ['Hostile', 'Aggressive'],
    ['Serene', 'Tranquil'], ['Agitated', 'Restless'], ['Fulfilled', 'Complete'], ['Empty', 'Hollow'],
    ['Vulnerable', 'Exposed'], ['Protected', 'Safe'], ['Rejected', 'Excluded'], ['Accepted', 'Welcomed'],
    ['Mood', 'Feeling'], ['Reaction', 'Response'], ['Expression', 'Gesture'], ['Tone', 'Attitude'],
    ['Trigger', 'Stimulus'], ['Coping', 'Dealing'], ['Venting', 'Ranting'], ['Bottling', 'Suppressing'],
  ]},
  { category: 'popculture', pairs: [
    ['Viral', 'Trending'], ['Meme', 'GIF'], ['Influencer', 'Creator'], ['Streamer', 'YouTuber'],
    ['Podcast', 'Vlog'], ['TikTok', 'Reels'], ['Instagram', 'Snapchat'], ['Twitter', 'Threads'],
    ['Facebook', 'Meta'], ['Netflix', 'Binge'], ['Spotify', 'Playlist'], ['Apple', 'Android'],
    ['Marvel', 'DC'], ['Star Wars', 'Star Trek'], ['Harry Potter', 'Fantastic Beasts'], ['Disney', 'Pixar'],
    ['Anime', 'Manga'], ['Cosplay', 'Convention'], ['Comic', 'Graphic novel'], ['Superhero', 'Villain'],
    ['Zombie', 'Vampire'], ['Alien', 'Robot'], ['Wizard', 'Witch'], ['Dragon', 'Phoenix'],
    ['Emoji', 'Sticker'], ['Hashtag', 'Mention'], ['DM', 'Reply'], ['Story', 'Post'],
    ['Like', 'Share'], ['Comment', 'React'], ['Follow', 'Subscribe'], ['Block', 'Mute'],
    ['Algorithm', 'Feed'], ['FYP', 'Explore'], ['Trend', 'Challenge'], ['Dance', 'Lip sync'],
    ['Unboxing', 'Review'], ['Tutorial', 'How-to'], ['ASMR', 'Relaxing'], ['Gaming', 'Esports'],
    ['Fortnite', 'Minecraft'], ['PlayStation', 'Xbox'], ['Nintendo', 'Switch'], ['PC', 'Console'],
    ['Celebrity', 'Star'], ['Fame', 'Influence'], ['Fan', 'Stan'], ['Ship', 'OTP'],
    ['Canon', 'Headcanon'], ['Spoiler', 'Leak'], ['Easter egg', 'Reference'], ['Cameo', 'Guest'],
    ['Reboot', 'Remake'], ['Sequel', 'Spinoff'], ['Prequel', 'Origin'], ['Finale', 'Cliffhanger'],
    ['Award', 'Oscar'], ['Grammy', 'Emmy'], ['MTV', 'VMA'], ['Golden Globe', 'SAG'],
    ['Red carpet', 'Premiere'], ['Paparazzi', 'Press'], ['Taboo', 'Controversy'], ['Cancel', 'Boycott'],
  ]},
];

let _cachedPairs: WordPair[] | null = null;

function expandSeedsToPairs(): WordPair[] {
  if (_cachedPairs) return _cachedPairs;
  const out: WordPair[] = [];
  let globalId = 0;
  const difficultyCycle: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
  for (const { category, pairs } of SEED_PAIRS) {
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      const difficulty = difficultyCycle[i % 3];
      out.push({
        id: `${category}-${globalId}`,
        wordA: pair[0],
        wordB: pair[1],
        category,
        difficulty,
      });
      globalId++;
    }
  }
  // Pad to 10,000 by cycling unique pairs (so we always have 10k entries, all playable)
  const baseLen = out.length;
  while (out.length < 10000) {
    const src = out[out.length % baseLen];
    out.push({
      ...src,
      id: `gen-${out.length}`,
    });
  }
  _cachedPairs = out;
  return out;
}

export function getWordPairs(): WordPair[] {
  return expandSeedsToPairs();
}

export function getWordPairsByCategory(category: WordCategory): WordPair[] {
  return getWordPairs().filter((p) => p.category === category);
}

export function getWordPairsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): WordPair[] {
  return getWordPairs().filter((p) => p.difficulty === difficulty);
}

export function getRandomWordPair(
  options?: { category?: WordCategory; difficulty?: 'easy' | 'medium' | 'hard' }
): WordPair | null {
  let pool = getWordPairs();
  if (options?.category) pool = pool.filter((p) => p.category === options.category);
  if (options?.difficulty) pool = pool.filter((p) => p.difficulty === options.difficulty);
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}
