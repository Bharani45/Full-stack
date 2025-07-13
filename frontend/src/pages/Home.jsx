import React from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import News from '../components/News';
import Collection from './Collection';
import Searchbar from '../components/Searchbar';
function Home() {
  return <div>
    
    <Hero/>
    <LatestCollection/>
    <BestSeller/>
    <OurPolicy/>
    <News/>
    
  </div>;
}

export default Home;
