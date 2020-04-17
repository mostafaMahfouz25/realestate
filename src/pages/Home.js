import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/home/Services'
import FeaturedRooms from '../components/home/FeaturedRooms'

export default function Home() {
    return (
        <>
        <Hero>
            <Banner title="React Rooms App " subtitle="delux rooms starting with $250000">
                <Link to="/rooms" className="btn-primary"> Our Rooms </Link>
            </Banner>
        </Hero>
        <Services />
        <FeaturedRooms />
        </>
    )
}
