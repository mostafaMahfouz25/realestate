import React, { Component } from 'react'
import {RoomContext} from '../Context';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';



export default class SingleRoom extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            slug:this.props.match.params.slug,
            defaultBcg
        }
    }
    static contextType = RoomContext;
    render() {
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug);
        if(!room)
        {
            return (
                <div className="error">
                    <h3>No Such Room Could Be Found</h3>
                    <Link to="/rooms" className="btn-primary">Back To Rooms</Link>
                </div>
            )
        }
        else 
        {
            const {name,description,capacity,size,price,extras,breakfast,pets,images} = room;
            return (
                <div>
                        <Hero hero="roomsHero">
                            <Banner  title={`${name} Room`}>
                            <Link to="/rooms" className="btn-primary">Back To Rooms</Link>
                            </Banner>
                        </Hero>
                        <section className="single-room">
                            <div className="single-room-images">
                                {
                                    images.map((item,index)=>{
                                        return (<img src={item} key={index} />)
                                    })
                                }
                            </div>
                            <div className="single-room-info">
                                <article className="desc">
                                    <h3> Details </h3>
                                    <p>{description}</p>
                                </article>
                                <article className="info">
                                    <h3> Info </h3>
                                    <h6>Price : ${price}</h6>
                                    <h6>Size : {size} SQFT</h6>
                                    <h6>
                                        Max Capacity : {" "}
                                        {
                                            capacity > 1 ? ` ${capacity} Peopel `: `${capacity} Person`
                                        }
                                    </h6>
                                    <h6>
                                        {
                                            pets ? "Pets Allowed" : "No Pets Allowed"
                                        }
                                    </h6>
                                    <h6>
                                        {breakfast && 'free breakfast included'}
                                    </h6>
                                </article>
                            </div>
                        </section>
                        <section className="room-extras">
                                <h6>Extras</h6>
                                <ul className="extras">
                                    {
                                        extras.map((item,index)=>{
                                            return <li key={index}> {item} </li>
                                        })
                                    }
                                </ul>
                        </section>
                </div>
            )
        }
        
    }
}
