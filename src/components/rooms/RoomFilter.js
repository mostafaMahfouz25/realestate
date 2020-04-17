import React,{useContext,useState} from 'react';
import {RoomContext} from '../../Context';
import Title from '../Title';

const getUnique = (items,value)=>{
    return [...new Set(items.map(item=>item[value]))]
}

function RoomFilter({rooms}) {
    const {handleChange,type,capacity,minPrice,maxPrice,minSize,maxSize,breakfast,pets,price}= useContext(RoomContext);
    const [showPrice,setShowPrice]  = useState(maxPrice);
    let types = getUnique(rooms,'type');
    types = ['all',...types];
    // console.log(types)
    types = types.map((item,index)=>{
        return <option key={index} value={item}>{item}</option>
    })
    


    // capacity  
    let people = getUnique(rooms,'capacity');
    people = people.map((item,index)=>{
        return <option key={index} value={item}>{item}</option>
    })

    const handlePrice =(e)=>{
        
        setShowPrice(e.target.value);
        handleChange(e)
    }
    
    
    return (
        <section className="filter-container">
            <Title title="Search Rooms" />
            <form className="filter-form">
                <div className="form-group">
                    <label htmlFor="type">Room Type</label>
                    <select name="type" className="form-control" id="type"  onChange={handleChange}>
                        {types}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="capacity">Room Type</label>
                    <select name="capacity" id="capacity"  className="form-control"   onChange={handleChange}>
                        {people}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Room Price ({showPrice}) </label>
                    <input name="price" id="price" type="range" value={price} min={minPrice} max={maxPrice} className="form-control"   onChange={handlePrice} />
                </div>

                <div className="form-group">
                    <label htmlFor="size">Room Size</label>
                    <input name="minSize" id="size" type="number" value={minSize} className="size-input"   onChange={handleChange} />
                    <input name="maxSize" id="size" type="number" value={maxSize} className="size-input"   onChange={handleChange} />
                </div>

            </form>
        </section>
    )
}

export default RoomFilter
