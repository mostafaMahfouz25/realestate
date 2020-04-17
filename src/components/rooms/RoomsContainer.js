import React from 'react';
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';
import Loading from '../Loading';
import {RoomConsumer} from '../../Context';

export default function RoomsContainer() {
    return (
        <RoomConsumer>
            {
                (value)=>{
                    const {loading,rooms,sortedRooms} = value;
                    if(loading)
                    {
                        return <Loading />
                    }
                    else 
                    {
                        return(
                            <div>
                                
                                <RoomFilter rooms={rooms} />
                                <RoomList rooms={sortedRooms} />
                            </div>
                        )
                    }
                    
                }
            }
        </RoomConsumer>
        
    )
}
