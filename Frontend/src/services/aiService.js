// AI Service for generating mood-based song recommendations

// Function to shuffle array and get random subset
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Function to get random subset of songs
const getRandomSongs = (songs, count = 6) => {
  const shuffled = shuffleArray(songs);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Mock AI function - replace with actual AI API call
export const generateAISongRecommendations = async (mood, category = null, refreshKey = 0) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('AI Service called with:', { mood, category, refreshKey });
  
  // Expanded AI-generated song recommendations based on mood/category - Hindi/Bollywood songs only
  const aiRecommendations = {
    'Happy': [
      { title: "Nagada Sang Dhol", artist: "Shreya Ghoshal & Osman Mir", description: "Energetic Gujarati celebration", youtube_url: "https://www.youtube.com/watch?v=3X7x4Ye-tqo&list=RD3X7x4Ye-tqo&start_radio=1 "},
      { title: "London Thumakda", artist: "Labh Janjua, Neha Kakkar", description: "Punjabi wedding celebration", youtube_url: "https://www.youtube.com/watch?v=udra3Mfw2oo&list=RDudra3Mfw2oo&start_radio=1" },
      { title: "Gallan Goodiyaan", artist: "Farhan Akhtar, Shankar Mahadevan", description: "High-energy Punjabi track", youtube_url: "https://www.youtube.com/watch?v=jCEdTq3j-0U&list=RDjCEdTq3j-0U&start_radio=1" },
      { title: "Subha Hone Na De", artist: "Mika Singh, Shefali Alvares", description: "Party morning anthem", youtube_url: "https://www.youtube.com/watch?v=Y7G-tYRzwYY&list=RDY7G-tYRzwYY&start_radio=1" },
      { title: "Desi Boyz", artist: "Akshay Kumar, John Abraham", description: "Stylish Punjabi swagger", youtube_url: "https://www.youtube.com/watch?v=iWhZ62o-arQ&list=RDiWhZ62o-arQ&start_radio=1" },
      { title: "Badtameez Dil", artist: "Benny Dayal", description: "Energetic Bollywood fun", youtube_url: "https://www.youtube.com/watch?v=II2EO3Nw4m0&list=RDII2EO3Nw4m0&start_radio=1" },
      { title: "Ghungroo", artist: "Arijit Singh, Shashaa Tirupati", description: "Dance party energy", youtube_url: "https://www.youtube.com/watch?v=qFkNATtc3mc&list=RDqFkNATtc3mc&start_radio=1" },
      { title: "First Class", artist: "Arijit Singh", description: "Stylish celebration", youtube_url: "https://www.youtube.com/watch?v=e8B0AzmXPV8&list=RDe8B0AzmXPV8&start_radio=1" },
      { title: "Proper Patola", artist: "Badshah, Diljit Dosanjh", description: "Punjabi party anthem", youtube_url: "https://www.youtube.com/watch?v=YmXJp4RtBCM&list=RDYmXJp4RtBCM&start_radio=1" },
      { title: "Bhangra Paa Le", artist: "Dhvani Bhanushali", description: "Punjabi dance celebration", youtube_url: "https://www.youtube.com/watch?v=O6vFwiB3J7k&list=RDO6vFwiB3J7k&start_radio=1" },
      { title: "Sauda Khara Khara", artist: "Diljit Dosanjh, Akshay Kumar", description: "Wedding celebration dance", youtube_url: "https://www.youtube.com/watch?v=LYEqeUr-158&list=RDLYEqeUr-158&start_radio=1" },
      { title: "Makhna", artist: "Tanishk Bagchi, Asees Kaur", description: "Upbeat party track", youtube_url: "https://www.youtube.com/watch?v=HqUeSjsYLNU&list=RDHqUeSjsYLNU&start_radio=1" },
      { title: "Chogada", artist: "Darshan Raval, Asees Kaur", description: "Garba celebration song", youtube_url: "https://www.youtube.com/watch?v=asYxxtiWUyw&list=RDasYxxtiWUyw&start_radio=1" },
      { title: "Kamariya", artist: "Neha Kakkar, Darshan Raval", description: "Dance number celebration", youtube_url: "https://www.youtube.com/watch?v=i0_m90T04uw&list=RDi0_m90T04uw&start_radio=1" }
    ],
    'Sad': [
      { title: "Channa Mereya", artist: "Arijit Singh", description: "Heartbreaking Bollywood ballad", youtube_url: "https://www.youtube.com/watch?v=284Ov7ysmfA&list=RD284Ov7ysmfA&start_radio=1" },
      { title: "Tum Hi Ho", artist: "Arijit Singh", description: "Emotional love dedication", youtube_url: "https://www.youtube.com/watch?v=Umqb9KENgmk&list=RDUmqb9KENgmk&start_radio=1" },
      { title: "Raabta", artist: "Arijit Singh", description: "Soulful connection", youtube_url: "https://www.youtube.com/watch?v=zAU_rsoS5ok&list=RDzAU_rsoS5ok&start_radio=1" },
      { title: "Mann Mera", artist: "Gajendra Verma", description: "Melancholic introspection", youtube_url: "https://www.youtube.com/watch?v=SlHnlxDt2TQ&list=RDSlHnlxDt2TQ&start_radio=1" },
      { title: "Baarish", artist: "Ash King, Shashaa Tirupati", description: "Rainy day sadness", youtube_url: "https://www.youtube.com/watch?v=BNfAf4To73c&list=RDBNfAf4To73c&start_radio=1" },
      { title: "Phir Bhi Tumko Chaahungi", artist: "Jubin Nautiyal", description: "Heartbreak and longing", youtube_url: "https://www.youtube.com/watch?v=jQdDpRTVe9k&list=RDjQdDpRTVe9k&start_radio=1" },
      { title: "Tujhe Kitna Chahne Lage", artist: "Jubin Nautiyal", description: "Deep emotional pain", youtube_url: "https://www.youtube.com/watch?v=AgX2II9si7w&list=RDAgX2II9si7w&start_radio=1" },
      { title: "Ve Maahi", artist: "Arijit Singh, Asees Kaur", description: "Romantic melancholy", youtube_url: "https://www.youtube.com/watch?v=j6muwUGdvXw&list=RDj6muwUGdvXw&start_radio=1" },
      { title: "Bolna", artist: "Arijit Singh, Asees Kaur", description: "Emotional conversation", youtube_url: "https://www.youtube.com/watch?v=GYFDRoJtfGM&list=RDGYFDRoJtfGM&start_radio=1" },
      { title: "Sanam Re", artist: "Arijit Singh", description: "Love and separation", youtube_url: "https://www.youtube.com/watch?v=DS-raAyMxl4&list=RDDS-raAyMxl4&start_radio=1" },
      { title: "Janam Janam", artist: "Atif Aslam", description: "Lifelong love story", youtube_url: "https://www.youtube.com/watch?v=cgmhimjsczk&list=RDcgmhimjsczk&start_radio=1" },
      { title: "Tera Ban Jaunga", artist: "Tulsi Kumar, Akhil Sachdeva", description: "Sacrificial love", youtube_url: "https://www.youtube.com/watch?v=mQiiw7uRngk&list=RDmQiiw7uRngk&start_radio=1" },
      { title: "Mere Rashke Qamar", artist: "Rahat Fateh Ali Khan", description: "Classic romantic pain", youtube_url: "https://www.youtube.com/watch?v=UGkLd1pxHQ0&list=RDUGkLd1pxHQ0&start_radio=1" },
      { title: "Dil Meri Na Sune", artist: "Atif Aslam", description: "Heartbreak rejection", youtube_url: "https://www.youtube.com/watch?v=YZLKoG_vhDY&list=RDYZLKoG_vhDY&start_radio=1" },
    ],
    'Angry': [
      { title: "Sadda Haq", artist: "A.R. Rahman, Mohit Chauhan", description: "Revolutionary anthem", youtube_url: "https://www.youtube.com/watch?v=p9DQINKZxWE&list=RDp9DQINKZxWE&start_radio=1" },
      { title: "Khalnayak", artist: "Alka Yagnik, Vinod Rathod", description: "Dark villain vibes", youtube_url: "https://www.youtube.com/watch?v=JWRYPAiq780&list=RDJWRYPAiq780&start_radio=1" },
      { title: "Ramta Jogi", artist: "Shankar Mahadevan", description: "Intense folk fusion", youtube_url: "https://www.youtube.com/watch?v=QxwmIXIWO7I&list=RDQxwmIXIWO7I&start_radio=1" },
      { title: "Aal Izz Well", artist: "Sonu Nigam, Swanand Kirkire", description: "Angsty youth anthem", youtube_url: "https://www.youtube.com/watch?v=7PzwOiW8-n0&list=RD7PzwOiW8-n0&start_radio=1" },
      { title: "Bhaag Milkha Bhaag", artist: "Meiyang Chang", description: "Intense motivational", youtube_url: "https://www.youtube.com/watch?v=hc7IJO7fD78&list=RDhc7IJO7fD78&start_radio=1" },
      { title: "Zinda", artist: "Shankar Mahadevan", description: "Rebellious spirit", youtube_url: "https://www.youtube.com/watch?v=Ax0G_P2dSBw&list=RDAx0G_P2dSBw&start_radio=1" },
    
      { title: "Bezuban", artist: "Mohit Chauhan", description: "Voiceless frustration", youtube_url: "https://www.youtube.com/watch?v=xutBFUf3LoU&list=RDxutBFUf3LoU&start_radio=1" },
      { title: "Jazba", artist: "Shafqat Amanat Ali", description: "Passionate anger", youtube_url: "https://www.youtube.com/watch?v=GiKfmRE8vUk&list=RDGiKfmRE8vUk&start_radio=1" },
          
    ],
    'Anxious': [
      { title: "Kun Faya Kun", artist: "A.R. Rahman, Javed Ali", description: "Sufi spiritual meditation", youtube_url: "https://www.youtube.com/watch?v=27CBPR7CSks&list=RD27CBPR7CSks&start_radio=1" },
      { title: "Mann Mohana", artist: "A.R. Rahman", description: "Devotional peace", youtube_url: "https://www.youtube.com/watch?v=-Rp97wDpyXA&list=RD-Rp97wDpyXA&start_radio=1" },
      { title: "Dil To Bacha Hai", artist: "Rahat Fateh Ali Khan", description: "Soothing Sufi melody", youtube_url: "https://www.youtube.com/watch?v=AtnB0DbuFFU&list=RDAtnB0DbuFFU&start_radio=1" },
    
      { title: "Maula Mere Maula", artist: "Javed Ali", description: "Spiritual seeking", youtube_url: "https://www.youtube.com/watch?v=l5sgIqzlPXc&list=RDl5sgIqzlPXc&start_radio=1" },
      { title: "Arziyan", artist: "Javed Ali, Kailash Kher", description: "Devotional prayer", youtube_url: "https://www.youtube.com/watch?v=dXdD1_AGBZg&list=RDdXdD1_AGBZg&start_radio=1" },
      { title: "Khwaja Mere Khwaja", artist: "A.R. Rahman", description: "Sufi devotion", youtube_url: "https://www.youtube.com/watch?v=4YbAaRFk70o&list=RD4YbAaRFk70o&start_radio=1" },
      { title: "Bhar Do Jholi Meri", artist: "Adnan Sami", description: "Spiritual surrender", youtube_url: "https://www.youtube.com/watch?v=zk0-f92gg9A&list=RDzk0-f92gg9A&start_radio=1" },
      { title: "Jhoom", artist: "Ali Zafar", description: "Meditative surrender", youtube_url: "https://www.youtube.com/watch?v=tfchHFd3CvU&list=RDtfchHFd3CvU&start_radio=1" },
      { title: "Tu Jaane Na", artist: "Atif Aslam", description: "Anxious uncertainty", youtube_url: "https://www.youtube.com/watch?v=53l2DkivxJs&list=RD53l2DkivxJs&start_radio=1" },
      { title: "Aashiyan", artist: "Shafqat Amanat Ali", description: "Peaceful home", youtube_url: "https://www.youtube.com/watch?v=OuNGySNJjWg&list=RDOuNGySNJjWg&start_radio=1" },
      { title: "Dil Ibadat", artist: "KK", description: "Spiritual longing", youtube_url: "https://www.youtube.com/watch?v=xzUVPN68Ym4&list=RDxzUVPN68Ym4&start_radio=1" },
      { title: "Rabba", artist: "Richa Sharma", description: "Divine calling", youtube_url: "https://www.youtube.com/watch?v=o4mHtJLgMLs&list=RDo4mHtJLgMLs&start_radio=1" },
      { title: "Allah Hafiz", artist: "Sonu Nigam", description: "Peaceful farewell", youtube_url: "https://www.youtube.com/watch?v=np5bNTK37Ic&list=RDnp5bNTK37Ic&start_radio=1" }
    ],
    'Tired': [
      { title: "Zara Sa", artist: "KK", description: "Gentle romantic melody", youtube_url: "https://www.youtube.com/watch?v=lUPltG1hb3k&list=RDlUPltG1hb3k&start_radio=1" },
      { title: "Tum Se Hi", artist: "Mohit Chauhan", description: "Soft and comforting", youtube_url: "https://www.youtube.com/watch?v=mt9xg0mmt28&list=RDmt9xg0mmt28&start_radio=1" },
      { title: "Pani Da Rang", artist: "Ayushmann Khurrana", description: "Melancholic comfort", youtube_url: "https://www.youtube.com/watch?v=zRzD3-a9_qc&list=RDzRzD3-a9_qc&start_radio=1" },
      { title: "Saibo", artist: "Shreya Ghoshal, Tochi Raina", description: "Peaceful duet", youtube_url: "https://www.youtube.com/watch?v=9Bmh6vaQt0s&list=RD9Bmh6vaQt0s&start_radio=1" },
      { title: "Ishq Bulaava", artist: "Sanam Puri, Shipra Goyal", description: "Gentle love", youtube_url: "https://www.youtube.com/watch?v=c2gSzYLJ8sY&list=RDc2gSzYLJ8sY&start_radio=1" },
      { title: "Mitti Di Khushboo", artist: "Ayushmann Khurrana", description: "Nostalgic comfort", youtube_url: "https://www.youtube.com/watch?v=8uJ-wOljP_s&list=RD8uJ-wOljP_s&start_radio=1" },
      { title: "Chaand Sifarish", artist: "Shaan, Kailash Kher", description: "Dreamy melody", youtube_url: "https://www.youtube.com/watch?v=zWEOx7TSM6I&list=RDzWEOx7TSM6I&start_radio=1" },
      { title: "Kuch Is Tarah", artist: "Atif Aslam", description: "Soft melancholy", youtube_url: "https://www.youtube.com/watch?v=bfMeglYx5Xw&list=RDbfMeglYx5Xw&start_radio=1" },
      { title: "Tere Bin", artist: "Atif Aslam", description: "Gentle longing", youtube_url: "https://www.youtube.com/watch?v=hejXc_FSYb8&list=RDhejXc_FSYb8&start_radio=1" },
      { title: "Aashiyan", artist: "Shafqat Amanat Ali", description: "Peaceful home", youtube_url: "https://www.youtube.com/watch?v=OuNGySNJjWg&list=RDOuNGySNJjWg&start_radio=1" },
      { title: "Dil Kyun Yeh Mera", artist: "KK", description: "Soft questioning", youtube_url: "https://www.youtube.com/watch?v=maKDIvUVkQo&list=RDmaKDIvUVkQo&start_radio=1" },
      { title: "Tum Mile", artist: "Neeraj Shridhar", description: "Journey meeting", youtube_url: "https://www.youtube.com/watch?v=odVptmgIcD0&list=RDodVptmgIcD0&start_radio=1" },
      { title: "Tu Hi Meri Shab Hai", artist: "KK", description: "Night comfort", youtube_url: "https://www.youtube.com/watch?v=mWBvudKcByg&list=RDmWBvudKcByg&start_radio=1" },
    ],
    'Excited': [
      { title: "Badtameez Dil", artist: "Benny Dayal", description: "Energetic Bollywood fun", youtube_url: "https://www.youtube.com/watch?v=II2EO3Nw4m0&list=RDII2EO3Nw4m0&start_radio=1" },
      { title: "Ghungroo", artist: "Arijit Singh, Shashaa Tirupati", description: "Dance party energy", youtube_url: "https://www.youtube.com/watch?v=qFkNATtc3mc&list=RDqFkNATtc3mc&start_radio=1" },
      { title: "First Class", artist: "Arijit Singh", description: "Stylish celebration", youtube_url: "https://www.youtube.com/watch?v=e8B0AzmXPV8&list=RDe8B0AzmXPV8&start_radio=1" },
      { title: "Proper Patola", artist: "Badshah, Diljit Dosanjh", description: "Punjabi party anthem", youtube_url: "https://www.youtube.com/watch?v=YmXJp4RtBCM&list=RDYmXJp4RtBCM&start_radio=1" },
      { title: "Nagada Sang Dhol", artist: "Shreya Ghoshal & Osman Mir", description: "High-energy Gujarati", youtube_url: "https://www.youtube.com/watch?v=3X7x4Ye-tqo&list=RD3X7x4Ye-tqo&start_radio=1" },
      { title: "London Thumakda", artist: "Labh Janjua, Neha Kakkar", description: "Punjabi celebration", youtube_url: "https://www.youtube.com/watch?v=udra3Mfw2oo&list=RDudra3Mfw2oo&start_radio=1" },
      { title: "Kala Chashma", artist: "Amar Arshi, Badshah", description: "Party dance anthem", youtube_url: "https://www.youtube.com/watch?v=k4yXQkG2s1E&list=RDk4yXQkG2s1E&start_radio=1" },
      { title: "Naach Meri Rani", artist: "Guru Randhawa, Nora Fatehi", description: "Modern party track", youtube_url: "https://www.youtube.com/watch?v=TCx1yMegJ4A&list=RDTCx1yMegJ4A&start_radio=1" },
      { title: "O Saki Saki", artist: "Tulsi Kumar, B Praak", description: "High-energy party", youtube_url: "https://www.youtube.com/watch?v=_uUdJalMaF8&list=RD_uUdJalMaF8&start_radio=1" },
      { title: "Makhna", artist: "Tanishk Bagchi, Asees Kaur", description: "Upbeat party track", youtube_url: "https://www.youtube.com/watch?v=HqUeSjsYLNU&list=RDHqUeSjsYLNU&start_radio=1" },
      { title: "Dhoom Machale", artist: "Aditi Singh Sharma", description: "High-energy adventure", youtube_url: "https://www.youtube.com/watch?v=2uUmHTgT65I&list=RD2uUmHTgT65I&start_radio=1" },
      { title: "Bang Bang", artist: "Amitabh Bhattacharya", description: "Action-packed journey", youtube_url: "https://www.youtube.com/watch?v=jZyAB2KFDls&list=RDjZyAB2KFDls&start_radio=1" },
      { title: "Selfie Le Le Re", artist: "Badshah", description: "Fun travel vibe", youtube_url: "https://www.youtube.com/watch?v=TITGBTGJZS8&list=RDTITGBTGJZS8&start_radio=1" },
      { title: "Jumme Ki Raat", artist: "Mika Singh", description: "Friday night party", youtube_url: "https://www.youtube.com/watch?v=dv_Qjzca56k&list=RDdv_Qjzca56k&start_radio=1" }
    ],
    'Calm': [
      { title: "Mann Mohana", artist: "A.R. Rahman", description: "Devotional tranquility", youtube_url: "https://www.youtube.com/watch?v=-Rp97wDpyXA&list=RD-Rp97wDpyXA&start_radio=1" },
      { title: "Kun Faya Kun", artist: "A.R. Rahman, Javed Ali", description: "Sufi spiritual meditation", youtube_url: "https://www.youtube.com/watch?v=27CBPR7CSks&list=RD27CBPR7CSks&start_radio=1" },
      { title: "Zara Sa", artist: "KK", description: "Gentle romantic melody", youtube_url: "https://www.youtube.com/watch?v=lUPltG1hb3k&list=RDlUPltG1hb3k&start_radio=1" },
      { title: "Tum Se Hi", artist: "Mohit Chauhan", description: "Soft and comforting", youtube_url: "http://youtube.com/watch?v=mt9xg0mmt28&list=RDmt9xg0mmt28&start_radio=1" },
      { title: "Saibo", artist: "Shreya Ghoshal, Tochi Raina", description: "Companion journey", youtube_url: "https://www.youtube.com/watch?v=9Bmh6vaQt0s&list=RD9Bmh6vaQt0s&start_radio=1" },
      { title: "Ishq Bulaava", artist: "Sanam Puri, Shipra Goyal", description: "Gentle love", youtube_url: "https://www.youtube.com/watch?v=c2gSzYLJ8sY&list=RDc2gSzYLJ8sY&start_radio=1" },
      { title: "Mitti Di Khushboo", artist: "Ayushmann Khurrana", description: "Nostalgic comfort", youtube_url: "https://www.youtube.com/watch?v=8uJ-wOljP_s&list=RD8uJ-wOljP_s&start_radio=1" },
      { title: "Chaand Sifarish", artist: "Shaan, Kailash Kher", description: "Dream journey", youtube_url: "https://www.youtube.com/watch?v=zWEOx7TSM6I&list=RDzWEOx7TSM6I&start_radio=1" },
      { title: "Dil Ibadat", artist: "KK", description: "Spiritual longing", youtube_url: "https://www.youtube.com/watch?v=xzUVPN68Ym4&list=RDxzUVPN68Ym4&start_radio=1" },
      { title: "Khwaja Mere Khwaja", artist: "A.R. Rahman", description: "Sufi devotion", youtube_url: "https://www.youtube.com/watch?v=4YbAaRFk70o&list=RD4YbAaRFk70o&start_radio=1" },
    ],
    'Confused': [
      { title: "Zara Sa", artist: "KK", description: "Thoughtful Bollywood melody", youtube_url: "https://www.youtube.com/watch?v=lUPltG1hb3k&list=RDlUPltG1hb3k&start_radio=1" },
      { title: "Tum Se Hi", artist: "Mohit Chauhan", description: "Contemplative romance", youtube_url: "https://www.youtube.com/watch?v=mt9xg0mmt28&list=RDmt9xg0mmt28&start_radio=1" },
      { title: "Ilahi", artist: "Arijit Singh", description: "Philosophical journey", youtube_url: "https://www.youtube.com/watch?v=fdubeMFwuGs&list=RDfdubeMFwuGs&start_radio=1" },
      { title: "Kahin To", artist: "Mohit Chauhan", description: "Searching and questioning", youtube_url: "https://www.youtube.com/watch?v=hCsY8T0uBGA&list=RDhCsY8T0uBGA&start_radio=1" },
      { title: "Tu Jaane Na", artist: "Atif Aslam", description: "Anxious uncertainty", youtube_url: "https://www.youtube.com/watch?v=P8PWN1OmZOA&list=RDP8PWN1OmZOA&start_radio=1" },
      { title: "Kuch Is Tarah", artist: "Atif Aslam", description: "Confused emotions", youtube_url: "https://www.youtube.com/watch?v=GJ0q5tW6z9k&list=RDGJ0q5tW6z9k&start_radio=1" },
      { title: "Dil Kyun Yeh Mera", artist: "KK", description: "Soft questioning", youtube_url: "https://www.youtube.com/watch?v=9p4Y7m2fZk8&list=RD9p4Y7m2fZk8&start_radio=1" },
      { title: "Rubaru", artist: "Shankar-Ehsaan-Loy", description: "Uncertain meeting", youtube_url: "https://www.youtube.com/watch?v=Qf3VQm7z3pE&list=RDQf3VQm7z3pE&start_radio=1" },
      { title: "Tere Bin", artist: "Atif Aslam", description: "Confused longing", youtube_url: "https://www.youtube.com/watch?v=0bAVd9jJE2Q&list=RD0bAVd9jJE2Q&start_radio=1" },
      { title: "Ishq Bulaava", artist: "Sanam Puri, Shipra Goyal", description: "Confused love", youtube_url: "https://www.youtube.com/watch?v=c2gSzYLJ8sY&list=RDc2gSzYLJ8sY&start_radio=1" },
      { title: "Mitti Di Khushboo", artist: "Ayushmann Khurrana", description: "Nostalgic confusion", youtube_url: "https://www.youtube.com/watch?v=8uJ-wOljP_s&list=RD8uJ-wOljP_s&start_radio=1" },
      { title: "Chaand Sifarish", artist: "Shaan, Kailash Kher", description: "Dreamy confusion", youtube_url: "https://www.youtube.com/watch?v=zWEOx7TSM6I&list=RDzWEOx7TSM6I&start_radio=1" }
    ],

    'Confident': [
      { title: "Sadda Haq", artist: "A.R. Rahman, Mohit Chauhan", description: "Revolutionary confidence", youtube_url: "https://www.youtube.com/watch?v=DGiyYnFC1Sg&list=RDDGiyYnFC1Sg&start_radio=1" },
      { title: "Zinda", artist: "Shankar Mahadevan", description: "Living life fully", youtube_url: "https://www.youtube.com/watch?v=Ax0G_P2dSBw&list=RDAx0G_P2dSBw&start_radio=1" },
      { title: "Chak De India", artist: "Sukhwinder Singh", description: "Patriotic confidence", youtube_url: "https://www.youtube.com/watch?v=6a0-dSMWm5g&list=RD6a0-dSMWm5g&start_radio=1" },
      { title: "Kar Har Maidaan Fateh", artist: "Sukhwinder Singh, Divya Kumar", description: "Never give up spirit", youtube_url: "https://www.youtube.com/watch?v=6Gq4p2X7T2U&list=RD6Gq4p2X7T2U&start_radio=1" },
      { title: "Brothers Anthem", artist: "Ajay-Atul", description: "Brotherhood confidence", youtube_url: "https://www.youtube.com/watch?v=1X7o3c8dX3w&list=RD1X7o3c8dX3w&start_radio=1" },
      { title: "Rock On!!", artist: "Farhan Akhtar", description: "Rock band confidence", youtube_url: "https://www.youtube.com/watch?v=FJrpcDgC3zU&list=RDFJrpcDgC3zU&start_radio=1" },
      { title: "Aashayein", artist: "KK, Salim-Sulaiman", description: "Hopeful confidence", youtube_url: "https://www.youtube.com/watch?v=7PZrW6y6xKQ&list=RD7PZrW6y6xKQ&start_radio=1" },
      { title: "Jazba", artist: "Shafqat Amanat Ali", description: "Passionate confidence", youtube_url: "https://www.youtube.com/watch?v=U0CGsw6h60k&list=RDU0CGsw6h60k&start_radio=1" },
      { title: "Dhoom Machale", artist: "Aditi Singh Sharma", description: "Action confidence", youtube_url: "https://www.youtube.com/watch?v=Z1BCujX3pw8&list=RDZ1BCujX3pw8&start_radio=1" },
      { title: "Bang Bang", artist: "Amitabh Bhattacharya", description: "Heroic confidence", youtube_url: "https://www.youtube.com/watch?v=jZyAB2KFDls&list=RDjZyAB2KFDls&start_radio=1" },
      { title: "Jumme Ki Raat", artist: "Mika Singh", description: "Party confidence", youtube_url: "https://www.youtube.com/watch?v=4k1y6gK5j5k&list=RD4k1y6gK5j5k&start_radio=1" },
      { title: "Selfie Le Le Re", artist: "Badshah", description: "Modern confidence", youtube_url: "https://www.youtube.com/watch?v=Tqj4q5N4y0Y&list=RDTqj4q5N4y0Y&start_radio=1" }
    ]
  };

  // Category-based recommendations - Hindi/Bollywood songs only
  const categoryRecommendations = {
    'Spiritual': [
      { title: "Hanuman Chalisa", artist: "Gulshan Kumar", description: "Powerful Hindu devotional hymn", youtube_url: "https://www.youtube.com/watch?v=AETFvQonfV8&list=RDAETFvQonfV8&start_radio=1" },
      { title: "Gayatri Mantra", artist: "Anuradha Paudwal", description: "Sacred Vedic chant for enlightenment", youtube_url: "https://www.youtube.com/watch?v=nwRoHC83wx0&list=RDnwRoHC83wx0&start_radio=1" },
      { title: "Shiv Tandav Stotram", artist: "Shankar Sahney", description: "Powerful Shiva mantra", youtube_url: "https://www.youtube.com/watch?v=S980-z1qx3g&list=RDS980-z1qx3g&start_radio=1" },
      { title: "Om Namah Shivaya", artist: "Anuradha Paudwal", description: "Ancient Shiva mantra", youtube_url: "https://www.youtube.com/watch?v=U7Idt8P8u5o" },
      { title: "Maha Mrityunjaya Mantra", artist: "Suresh Wadkar", description: "Powerful healing mantra", youtube_url: "https://www.youtube.com/watch?v=U7Idt8P8u5o" },
      { title: "Vishnu Sahasranamam", artist: "M.S. Subbulakshmi", description: "Thousand names of Lord Vishnu", youtube_url: "https://www.youtube.com/watch?v=U7Idt8P8u5o" },
      { title: "Kun Faya Kun", artist: "A.R. Rahman, Javed Ali", description: "Sufi spiritual meditation", youtube_url: "https://www.youtube.com/watch?v=T94PHkuydcw&list=RDT94PHkuydcw&start_radio=1" },
     
      { title: "Maula Mere Maula", artist: "Javed Ali", description: "Spiritual seeking", youtube_url: "https://www.youtube.com/watch?v=l5sgIqzlPXc&list=RDl5sgIqzlPXc&start_radio=1" },
      
      { title: "Khwaja Mere Khwaja", artist: "A.R. Rahman", description: "Sufi devotion", youtube_url: "https://www.youtube.com/watch?v=4YbAaRFk70o&list=RD4YbAaRFk70o&start_radio=1" },
      { title: "Bhar Do Jholi Meri", artist: "Adnan Sami", description: "Spiritual surrender", youtube_url: "https://www.youtube.com/watch?v=zk0-f92gg9A&list=RDzk0-f92gg9A&start_radio=1" },
     
      { title: "Hare Krishna", artist: "ISKCON", description: "Maha Mantra for peace", youtube_url: "https://www.youtube.com/watch?v=U7Idt8P8u5o" }
    ],
    'Mood Based': [
      { title: "Nagada Sang Dhol", artist: "Shreya Ghoshal & Osman Mir", description: "Energetic celebration for happy mood", youtube_url: "https://www.youtube.com/watch?v=kYt_H1o4eV4" },
      { title: "Channa Mereya", artist: "Arijit Singh", description: "Emotional ballad for sad moments", youtube_url: "https://www.youtube.com/watch?v=Qh2Lr8eIdjQ" },
      { title: "Sadda Haq", artist: "A.R. Rahman, Mohit Chauhan", description: "Revolutionary anthem for angry mood", youtube_url: "https://www.youtube.com/watch?v=DGiyYnFC1Sg" },
      { title: "Kun Faya Kun", artist: "A.R. Rahman, Javed Ali", description: "Sufi peace for anxious moments", youtube_url: "https://www.youtube.com/watch?v=hq1_KXfz_qg" },
      { title: "Zara Sa", artist: "KK", description: "Gentle melody for tired mood", youtube_url: "https://www.youtube.com/watch?v=U7Idt8P8u5o" },
      { title: "Badtameez Dil", artist: "Benny Dayal", description: "High energy for excited mood", youtube_url: "https://www.youtube.com/watch?v=AgFeZr5k8uI" },
      { title: "Mann Mohana", artist: "A.R. Rahman", description: "Peaceful for calm moments", youtube_url: "https://www.youtube.com/watch?v=mJ8gJYf8c7k" },
      { title: "Zara Sa", artist: "KK", description: "Thoughtful for confused mood", youtube_url: "https://www.youtube.com/watch?v=U7Idt8P8u5o" },
      { title: "Sadda Haq", artist: "A.R. Rahman, Mohit Chauhan", description: "Empowering for confident mood", youtube_url: "https://www.youtube.com/watch?v=DGiyYnFC1Sg" },
      { title: "London Thumakda", artist: "Labh Janjua, Neha Kakkar", description: "Celebration for happy mood", youtube_url: "https://www.youtube.com/watch?v=U6kNdA5n9eY" },
      { title: "Tum Hi Ho", artist: "Arijit Singh", description: "Heartfelt for sad mood", youtube_url: "https://www.youtube.com/watch?v=U_gP3V6q_9g" },
      { title: "Bhaag Milkha Bhaag", artist: "Meiyang Chang", description: "Motivational for angry mood", youtube_url: "https://www.youtube.com/watch?v=U7Idt8P8u5o" },
      { title: "Maula Mere Maula", artist: "Javed Ali", description: "Calming for anxious mood", youtube_url: "https://www.youtube.com/watch?v=U7Idt8P8u5o" },
      { title: "Saibo", artist: "Shreya Ghoshal, Tochi Raina", description: "Relaxing for tired mood", youtube_url: "https://www.youtube.com/watch?v=mJ8gJYf8c7k" },
      { title: "Ghungroo", artist: "Arijit Singh, Shashaa Tirupati", description: "Energetic for excited mood", youtube_url: "https://www.youtube.com/watch?v=fgL3JiSxL3g" }
    ],
    'Travelling': [
      { title: "Ilahi", artist: "Arijit Singh", description: "Philosophical journey", youtube_url: "https://www.youtube.com/watch?v=6w67NOaRe-w&list=RD6w67NOaRe-w&start_radio=1" },
      { title: "Patakha Guddi", artist: "Nooran Sisters", description: "Free-spirited journey", youtube_url: "https://www.youtube.com/watch?v=8HDTS80dlr4&list=RD8HDTS80dlr4&start_radio=1" },
      { title: "Dhoom Machale", artist: "Aditi Singh Sharma", description: "High-energy adventure", youtube_url: "https://www.youtube.com/watch?v=2uUmHTgT65I&list=RD2uUmHTgT65I&start_radio=1" },
      { title: "Bang Bang", artist: "Amitabh Bhattacharya", description: "Action-packed journey", youtube_url: "https://www.youtube.com/watch?v=jZyAB2KFDls&list=RDjZyAB2KFDls&start_radio=1" },
      { title: "Selfie Le Le Re", artist: "Badshah", description: "Fun travel vibe", youtube_url: "https://www.youtube.com/watch?v=TITGBTGJZS8&list=RDTITGBTGJZS8&start_radio=1" },
      { title: "Zinda", artist: "Shankar Mahadevan", description: "Life journey", youtube_url: "https://www.youtube.com/watch?v=Ax0G_P2dSBw&list=RDAx0G_P2dSBw&start_radio=1" },
      { title: "Kahin To", artist: "Mohit Chauhan", description: "Searching journey", youtube_url: "https://www.youtube.com/watch?v=U7Idt8P8u5o" },
      { title: "Chaand Sifarish", artist: "Shaan, Kailash Kher", description: "Dream journey", youtube_url: "https://www.youtube.com/watch?v=zWEOx7TSM6I&list=RDzWEOx7TSM6I&start_radio=1" },
      { title: "Tum Mile", artist: "Neeraj Shridhar", description: "Journey meeting", youtube_url: "https://www.youtube.com/watch?v=odVptmgIcD0&list=RDodVptmgIcD0&start_radio=1" },
      { title: "Tu Hi Meri Shab Hai", artist: "KK", description: "Night journey", youtube_url: "https://www.youtube.com/watch?v=mWBvudKcByg&list=RDmWBvudKcByg&start_radio=1" },
      { title: "Rubaru", artist: "Shankar-Ehsaan-Loy", description: "Journey encounter", youtube_url: "https://www.youtube.com/watch?v=YKhPHVIijqc&list=RDYKhPHVIijqc&start_radio=1" },
      { title: "Mitti Di Khushboo", artist: "Ayushmann Khurrana", description: "Nostalgic journey", youtube_url: "https://www.youtube.com/watch?v=8uJ-wOljP_s&list=RD8uJ-wOljP_s&start_radio=1" },
      { title: "Pani Da Rang", artist: "Ayushmann Khurrana", description: "Memory journey", youtube_url: "https://www.youtube.com/watch?v=zRzD3-a9_qc&list=RDzRzD3-a9_qc&start_radio=1" },
      { title: "Saibo", artist: "Shreya Ghoshal, Tochi Raina", description: "Companion journey", youtube_url: "https://www.youtube.com/watch?v=9Bmh6vaQt0s&list=RD9Bmh6vaQt0s&start_radio=1" }
    ],
    'Party': [
      { title: "Nagada Sang Dhol", artist: "Shreya Ghoshal & Osman Mir", description: "Energetic Gujarati celebration", youtube_url: "https://www.youtube.com/watch?v=3X7x4Ye-tqo&list=RD3X7x4Ye-tqo&start_radio=1" },
      { title: "London Thumakda", artist: "Labh Janjua, Neha Kakkar", description: "Punjabi wedding celebration", youtube_url: "https://www.youtube.com/watch?v=udra3Mfw2oo&list=RDudra3Mfw2oo&start_radio=1" },
      { title: "Gallan Goodiyaan", artist: "Farhan Akhtar, Shankar Mahadevan", description: "High-energy Punjabi track", youtube_url: "https://www.youtube.com/watch?v=jCEdTq3j-0U&list=RDjCEdTq3j-0U&start_radio=1" },
      { title: "Subha Hone Na De", artist: "Mika Singh, Shefali Alvares", description: "Party morning anthem", youtube_url: "https://www.youtube.com/watch?v=Y7G-tYRzwYY&list=RDY7G-tYRzwYY&start_radio=1" },
      { title: "Badtameez Dil", artist: "Benny Dayal", description: "Energetic Bollywood fun", youtube_url: "https://www.youtube.com/watch?v=II2EO3Nw4m0&list=RDII2EO3Nw4m0&start_radio=1" },
      { title: "Ghungroo", artist: "Arijit Singh, Shashaa Tirupati", description: "Dance party energy", youtube_url: "https://www.youtube.com/watch?v=qFkNATtc3mc&list=RDqFkNATtc3mc&start_radio=1" },
      { title: "First Class", artist: "Arijit Singh", description: "Stylish celebration", youtube_url: "https://www.youtube.com/watch?v=e8B0AzmXPV8&list=RDe8B0AzmXPV8&start_radio=1" },
      { title: "Proper Patola", artist: "Badshah, Diljit Dosanjh", description: "Punjabi party anthem", youtube_url: "https://www.youtube.com/watch?v=YmXJp4RtBCM&list=RDYmXJp4RtBCM&start_radio=1" },
      { title: "Kala Chashma", artist: "Amar Arshi, Badshah", description: "Party dance anthem", youtube_url: "https://www.youtube.com/watch?v=k4yXQkG2s1E&list=RDk4yXQkG2s1E&start_radio=1" },
      { title: "Naach Meri Rani", artist: "Guru Randhawa, Nora Fatehi", description: "Modern party track", youtube_url: "https://www.youtube.com/watch?v=TCx1yMegJ4A&list=RDTCx1yMegJ4A&start_radio=1" },
      { title: "O Saki Saki", artist: "Tulsi Kumar, B Praak", description: "High-energy party", youtube_url: "https://www.youtube.com/watch?v=_uUdJalMaF8&list=RD_uUdJalMaF8&start_radio=1" },
      { title: "Makhna", artist: "Tanishk Bagchi, Asees Kaur", description: "Upbeat party track", youtube_url: "https://www.youtube.com/watch?v=HqUeSjsYLNU&list=RDHqUeSjsYLNU&start_radio=1" },
      { title: "Sauda Khara Khara", artist: "Diljit Dosanjh, Akshay Kumar", description: "Wedding celebration dance", youtube_url: "https://www.youtube.com/watch?v=651huO7TOWI&list=RD651huO7TOWI&start_radio=1" }
    ],
    'Rock': [
      { title: "Sadda Haq", artist: "A.R. Rahman, Mohit Chauhan", description: "Revolutionary rock anthem", youtube_url: "https://www.youtube.com/watch?v=p9DQINKZxWE&list=RDp9DQINKZxWE&start_radio=1" },
      { title: "Kun Faya Kun", artist: "A.R. Rahman, Javed Ali", description: "Sufi rock fusion", youtube_url: "https://www.youtube.com/watch?v=T94PHkuydcw&list=RDT94PHkuydcw&start_radio=1" },
      { title: "Bhaag Milkha Bhaag", artist: "Meiyang Chang", description: "Rock motivational", youtube_url: "https://www.youtube.com/watch?v=hc7IJO7fD78&list=RDhc7IJO7fD78&start_radio=1" },
      { title: "Zinda", artist: "Shankar Mahadevan", description: "Rock celebration", youtube_url: "https://www.youtube.com/watch?v=Ax0G_P2dSBw&list=RDAx0G_P2dSBw&start_radio=1" },
      { title: "Pappu Can't Dance", artist: "Vishal Dadlani", description: "Rock fun track", youtube_url: "https://www.youtube.com/watch?v=dbdtBQ16CXc&list=RDdbdtBQ16CXc&start_radio=1" },
      { title: "Rock On!!", artist: "Farhan Akhtar", description: "Rock band spirit", youtube_url: "https://www.youtube.com/watch?v=EOyyVT31cCM&list=RDEOyyVT31cCM&start_radio=1" },
      { title: "Aal Izz Well", artist: "Sonu Nigam, Swanand Kirkire", description: "Rock youth anthem", youtube_url: "https://www.youtube.com/watch?v=7PzwOiW8-n0&list=RD7PzwOiW8-n0&start_radio=1" },
      { title: "Ramta Jogi", artist: "Shankar Mahadevan", description: "Rock folk fusion", youtube_url: "https://www.youtube.com/watch?v=QxwmIXIWO7I&list=RDQxwmIXIWO7I&start_radio=1" },
      { title: "Bezuban", artist: "Mohit Chauhan", description: "Rock frustration", youtube_url: "https://www.youtube.com/watch?v=1ieSD44Yjyk&list=RD1ieSD44Yjyk&start_radio=1" },    
      { title: "Kuch Bhi Nahin", artist: "Vishal Dadlani", description: "Rock nihilism", youtube_url: "https://www.youtube.com/watch?v=U7Idt8P8u5o" },
      { title: "Dilliwaali Girlfriend", artist: "Arijit Singh", description: "Urban rock", youtube_url: "https://www.youtube.com/watch?v=1cDoRqPnCXU&list=RD1cDoRqPnCXU&start_radio=1" },
      { title: "Kar Har Maidaan Fateh", artist: "Sukhwinder Singh, Divya Kumar", description: "Rock determination", youtube_url: "https://www.youtube.com/watch?v=9iIX4PBplAY&list=RD9iIX4PBplAY&start_radio=1" }
    ]
  };

  // Return AI-generated recommendations with shuffle
  let allSongs = [];
  console.log('Available categories:', Object.keys(categoryRecommendations));
  console.log('Available moods:', Object.keys(aiRecommendations));
  
  if (category && categoryRecommendations[category]) {
    allSongs = categoryRecommendations[category];
    console.log(`Using category "${category}" with ${allSongs.length} songs`);
  } else if (mood && aiRecommendations[mood]) {
    allSongs = aiRecommendations[mood];
    console.log(`Using mood "${mood}" with ${allSongs.length} songs`);
  } else {
    console.log('No matching category or mood found, returning empty array');
  }
  
  console.log('Selected songs before shuffle:', allSongs.slice(0, 3));
  
  // Return random subset of songs (6 songs) and use refreshKey for variety
  const shuffledSongs = shuffleArray(allSongs);
  const offset = (refreshKey || 0) % Math.max(1, shuffledSongs.length - 5);
  return shuffledSongs.slice(offset, offset + 6);
};

// Function to generate YouTube search URL for songs without direct links
export const generateYouTubeSearchUrl = (title, artist) => {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${title} ${artist}`)}`;
};

// Mock AI function to generate quotes based on mood
export const generateAIQuotes = async (mood, refreshKey = 0) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // AI-generated quotes based on mood
  const aiQuotes = {
    'Happy': [
      { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
      { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
      { text: "Happiness is a warm puppy.", author: "Charles M. Schulz" },
      { text: "The most important thing is to enjoy your life—to be happy—it's all that matters.", author: "Audrey Hepburn" },
      { text: "Happiness is when what you think, what you say, and what you do are in harmony.", author: "Mahatma Gandhi" },
      { text: "The secret of happiness is not found in seeking more, but in developing the capacity to enjoy less.", author: "Socrates" },
      { text: "Happiness is not a goal; it is a by-product.", author: "Eleanor Roosevelt" },
      { text: "The joy of life comes from our encounters with new experiences.", author: "Christopher McCandless" },
      { text: "Be happy for this moment. This moment is your life.", author: "Omar Khayyam" },
      { text: "Happiness is a state of mind. It's just according to the way you look at things.", author: "Walt Disney" },
      { text: "The best way to cheer yourself is to try to cheer someone else up.", author: "Mark Twain" },
      { text: "Happiness is the meaning and the purpose of life, the whole aim and end of human existence.", author: "Aristotle" },
      { text: "A happy life consists in tranquility of mind.", author: "Cicero" },
      { text: "Happiness is not something you postpone for the future; it is something you design for the present.", author: "Jim Rohn" },
      { text: "The foundation of all happiness is good health.", author: "Leigh Hunt" }
    ],
    'Sad': [
      { text: "Tears come from the heart and not from the brain.", author: "Leonardo da Vinci" },
      { text: "The soul would have no rainbow had the eyes no tears.", author: "John Vance Cheney" },
      { text: "Sadness flies away on the wings of time.", author: "Jean de La Fontaine" },
      { text: "The word 'happy' would lose its meaning if it were not balanced by sadness.", author: "Carl Jung" },
      { text: "Sadness is but a wall between two gardens.", author: "Khalil Gibran" },
      { text: "Tears are the silent language of grief.", author: "Voltaire" },
      { text: "The cure for anything is salt water: sweat, tears or the sea.", author: "Isak Dinesen" },
      { text: "Sadness is the result of loss, but it's also a preparation for the next gain.", author: "Unknown" },
      { text: "In deep sadness, there is no place for sentimentality.", author: "William Faulkner" },
      { text: "The way sadness works is one of the strange riddles of the world.", author: "Anne Lamott" },
      { text: "Sadness is the opposite of happiness, but not its enemy.", author: "Unknown" },
      { text: "Every human walks around with a certain kind of sadness.", author: "Tom Hiddleston" },
      { text: "Sadness is a gift from God to make us appreciate joy.", author: "Unknown" },
      { text: "The pain of sadness is the price we pay for love.", author: "Unknown" },
      { text: "Sadness is the beginning of healing.", author: "Unknown" }
    ],
    'Angry': [
      { text: "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured.", author: "Mark Twain" },
      { text: "For every minute you remain angry, you give up sixty seconds of peace of mind.", author: "Ralph Waldo Emerson" },
      { text: "Anger is just a cowardly extension of sadness. It's a lot easier to be angry at someone than it is to tell them you're hurt.", author: "Tom Gates" },
      { text: "Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned.", author: "Buddha" },
      { text: "Anger is a momentary madness, so control your passion or it will control you.", author: "Horace" },
      { text: "The greatest remedy for anger is delay.", author: "Seneca" },
      { text: "Anger begins with folly, and ends with regret.", author: "Pythagoras" },
      { text: "Never respond to an angry person with a fiery comeback, even if he deserves it...Don't allow his anger to become your anger.", author: "Lorii Myers" },
      { text: "Anger is a bad counselor.", author: "Federico Fellini" },
      { text: "A man who has not passed through the inferno of his passions has never overcome them.", author: "Carl Jung" },
      { text: "Anger is an energy that can be transformed into positive action.", author: "Unknown" },
      { text: "The best fighter is never angry.", author: "Lao Tzu" },
      { text: "Anger is the wind that blows out the lamp of the mind.", author: "Robert Green Ingersoll" },
      { text: "When anger rises, think of the consequences.", author: "Confucius" },
      { text: "Anger is a valid emotion. It's only destructive when it's not acknowledged.", author: "Unknown" }
    ],
    'Anxious': [
      { text: "Anxiety is the dizziness of freedom.", author: "Søren Kierkegaard" },
      { text: "Worry does not empty tomorrow of its sorrows; it empties today of its strength.", author: "Corrie Ten Boom" },
      { text: "Anxiety is the handmaiden of creativity.", author: "T.S. Eliot" },
      { text: "Our anxiety does not empty tomorrow of its sorrows, but only empties today of its strengths.", author: "Charles H. Spurgeon" },
      { text: "Anxiety is a thin stream of fear trickling through the mind. If encouraged, it cuts a channel into which all other thoughts are drained.", author: "Arthur Somers Roche" },
      { text: "The greatest mistake you can make in life is to be continually fearing you will make one.", author: "Elbert Hubbard" },
      { text: "Anxiety is love's greatest killer. It makes others feel as you might when a drowning man holds on to you.", author: "Anais Nin" },
      { text: "Nothing in the universe can travel at the speed of light, except perhaps bad news, which follows its own rules.", author: "Douglas Adams" },
      { text: "Anxiety is the rust of life, destroying its brightness and weakening its power.", author: "Unknown" },
      { text: "The chief danger in life is that you may take too many precautions.", author: "Alfred Adler" },
      { text: "Anxiety is the space between 'now' and 'then'.", author: "Unknown" },
      { text: "The only way to escape the personal corruption of anxiety is to generously share your gifts with others.", author: "Unknown" },
      { text: "Anxiety is the beginning of consciousness, an awareness of life's ultimate possibilities.", author: "Rollo May" },
      { text: "Worry often gives a small thing a big shadow.", author: "Swedish Proverb" },
      { text: "Anxiety is the illness of doubt.", author: "Unknown" }
    ],
    'Tired': [
      { text: "Fatigue makes cowards of us all.", author: "Vince Lombardi" },
      { text: "The time to relax is when you don't have time for it.", author: "Sydney J. Harris" },
      { text: "Sometimes the most productive thing you can do is relax.", author: "Mark Black" },
      { text: "Rest is not idleness, and to lie sometimes on the grass under trees on a summer's day, listening to the murmur of water, or watching the clouds float across the sky, is by no means a waste of time.", author: "John Lubbock" },
      { text: "Tired minds don't plan well. Sleep first, plan later.", author: "Walter Reisch" },
      { text: "The best bridge between despair and hope is a good night's sleep.", author: "E. Joseph Cossman" },
      { text: "There is a virtue in work; there is a virtue in rest. Use both and overlook neither.", author: "Alan Cohen" },
      { text: "Sleep is the golden chain that ties health and our bodies together.", author: "Thomas Dekker" },
      { text: "A good laugh and a long sleep are the two best cures for anything.", author: "Irish Proverb" },
      { text: "Rest when you're weary. Refresh and renew yourself, your body, your mind, your spirit.", author: "Ralph Marston" },
      { text: "The time to relax is when you don't have time for it.", author: "Sydney J. Harris" },
      { text: "Tiredness is the best pillow.", author: "Benjamin Franklin" },
      { text: "Rest is a weapon.", author: "Chiang Kai-shek" },
      { text: "Sleep is the best meditation.", author: "Dalai Lama" },
      { text: "The body is a sacred garment. It's your first and last garment; it is what you enter life in and what you depart life with, and it should be treated with honor.", author: "Martha Graham" }
    ],
    'Excited': [
      { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
      { text: "The excitement of learning separates youth from old age. As long as you're learning, you're not old.", author: "Roslyn Yalow" },
      { text: "Excitement must lead to immediate action or it will dissipate.", author: "Robert Ringer" },
      { text: "The excitement of a new project is the most powerful motivator.", author: "Unknown" },
      { text: "Passion is energy. Feel the power that comes from focusing on what excites you.", author: "Oprah Winfrey" },
      { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { text: "Excitement is the physical manifestation of joy.", author: "Unknown" },
      { text: "The world is a book and those who do not travel read only one page.", author: "Saint Augustine" },
      { text: "Life is a journey, and if you fall in love with the journey, you will be in love forever.", author: "Peter Hagerty" },
      { text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.", author: "Ralph Waldo Emerson" },
      { text: "Adventure is worthwhile in itself.", author: "Amelia Earhart" },
      { text: "The biggest adventure you can take is to live the life of your dreams.", author: "Oprah Winfrey" },
      { text: "Excitement is the spark that ignites the flame of achievement.", author: "Unknown" },
      { text: "Life is either a great adventure or nothing.", author: "Helen Keller" },
      { text: "The joy of excitement is the fuel for great achievements.", author: "Unknown" }
    ],
    'Calm': [
      { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
      { text: "The mind is like water. When it's agitated, it becomes difficult to see. When it's calm, everything becomes clear.", author: "Prasad Mahes" },
      { text: "In the midst of movement and chaos, keep stillness inside of you.", author: "Deepak Chopra" },
      { text: "Calmness is the cradle of power.", author: "Josiah Gilbert Holland" },
      { text: "The more tranquil a man becomes, the greater is his success, his influence, his power for good.", author: "James Allen" },
      { text: "Nothing can bring you peace but yourself.", author: "Ralph Waldo Emerson" },
      { text: "The greatest weapon against stress is our ability to choose one thought over another.", author: "William James" },
      { text: "Calmness is the universal language of peace.", author: "Unknown" },
      { text: "A calm mind brings inner strength and self-confidence.", author: "Dalai Lama" },
      { text: "The quieter you become, the more you can hear.", author: "Ram Dass" },
      { text: "Calmness of mind is one of the beautiful jewels of wisdom.", author: "James Allen" },
      { text: "Within you, there is a stillness and a sanctuary to which you can retreat at any time.", author: "Hermann Hesse" },
      { text: "Peace is the result of retraining your mind to process life as it is, rather than as you think it should be.", author: "Wayne Dyer" },
      { text: "The mind is like water. When it's turbulent, it's difficult to see. When it's calm, everything becomes clear.", author: "Prasad Mahes" },
      { text: "Calmness is the perfect state in which to receive wisdom.", author: "Unknown" }
    ],
    'Confused': [
      { text: "Confusion is a word we have invented for an order which is not understood.", author: "Henry Miller" },
      { text: "The true sign of intelligence is not knowledge but imagination.", author: "Albert Einstein" },
      { text: "Confusion is the welcome mat at the door of creativity.", author: "Michael J. Gelb" },
      { text: "The beginning of knowledge is the discovery of something we do not understand.", author: "Frank Herbert" },
      { text: "Confusion is a luxury which only the very, very young can possibly afford.", author: "Sylvia Plath" },
      { text: "The path to clarity is often through confusion.", author: "Unknown" },
      { text: "Confusion is the first step toward understanding.", author: "Unknown" },
      { text: "The moment you doubt whether you can fly, you cease forever to be able to do it.", author: "J.M. Barrie" },
      { text: "Confusion is the threshold of transformation.", author: "Unknown" },
      { text: "The wise man is one who, knows, what he does not know.", author: "Lao Tzu" },
      { text: "Confusion is the language of the soul trying to speak to the mind.", author: "Unknown" },
      { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
      { text: "Confusion is the necessary precursor to clarity.", author: "Unknown" },
      { text: "The mind is not a vessel to be filled, but a fire to be kindled.", author: "Plutarch" },
      { text: "Confusion is the beginning of wisdom.", author: "Unknown" }
    ],
    'Confident': [
      { text: "Confidence is not 'they will like me'. Confidence is 'I'll be fine if they don't'.", author: "Christina Grimmie" },
      { text: "The moment you doubt whether you can fly, you cease forever to be able to do it.", author: "J.M. Barrie" },
      { text: "Confidence comes not from always being right but from not fearing to be wrong.", author: "Peter T. Mcintyre" },
      { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { text: "Confidence is the most beautiful thing you can possess.", author: "Sabrina Carpenter" },
      { text: "The way to develop self-confidence is to do the thing you fear and get a record of successful experiences behind you.", author: "William Jennings Bryan" },
      { text: "Confidence is preparation. Everything else is beyond your control.", author: "Richard Kline" },
      { text: "You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.", author: "Eleanor Roosevelt" },
      { text: "Confidence is the companion of success.", author: "Unknown" },
      { text: "The man who has confidence in himself gains the confidence of others.", author: "Hasidic Proverb" },
      { text: "Self-confidence is the first requisite to great undertakings.", author: "Samuel Johnson" },
      { text: "Confidence is a habit that can be developed by acting as if you already had the confidence you desire to have.", author: "Brian Tracy" },
      { text: "With confidence, you have won before you have started.", author: "Marcus Garvey" },
      { text: "Confidence is the key to success.", author: "Unknown" },
      { text: "The confidence which we have in a given individual is no guarantee that what he says is trustworthy.", author: "Epictetus" }
    ]
  };

  // Return random subset of quotes (3 quotes) and use refreshKey for variety
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const allQuotes = aiQuotes[mood] || [];
  const shuffledQuotes = shuffleArray(allQuotes);
  const offset = (refreshKey || 0) % Math.max(1, shuffledQuotes.length - 2);
  return shuffledQuotes.slice(offset, offset + 3);
};
