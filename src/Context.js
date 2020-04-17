import React, { Component } from 'react'
import Items from './data';
const RoomContext = React.createContext();
class RoomProvider extends Component {

    state = {
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading:true,
        type:"all",
        capacity:1,
        minPrice:0,
        maxPrice:0,
        minSize:0,
        maxSize:0,
        price:0,
        breakfast:false,
        pets:0
    }

    componentDidMount = ()=>{
        let rooms = this.formatData(Items);
        let featuredRooms = rooms.filter(room=>room.featured === true)

        let maxPrice = Math.max(...rooms.map((item)=>item.price));
        let maxSize = Math.max(...rooms.map((item)=>item.size));
        this.setState({rooms,featuredRooms,sortedRooms:rooms,loading:false,maxPrice,maxSize,price:maxPrice})
    }
    formatData(items){
        let tempItems = items.map((item)=>{
            let id = item.sys.id;
            let images = item.fields.images.map(image=>image.fields.file.url);
            let room = {...item.fields,images,id}
            return room;
        })

        return tempItems;
    }

    // get one room

    getRoom = (slug)=>{
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room)=> room.slug === slug);
        return room;
    }

    handleChange = (e)=>{
        const target = e.target;
        // const type = target.type;
        // console.log(target.type)
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = e.target.name;
        this.setState({
            [name]:value
        },this.filterRooms)
        // console.log(type,name,value);
    }

    filterRooms = ()=>{
       
        let {rooms,type,capacity,price,minSize,maxSize} = this.state;
        let tempRooms = [...rooms];
        capacity = +capacity;
        price = +price;
        if(type !== "all")
        {
            tempRooms = tempRooms.filter((item)=>item.type===type);
        }

        if(capacity !== 1)
        {
            tempRooms = tempRooms.filter((item)=>item.capacity >= capacity);
        }

        // filter by price 
        tempRooms = tempRooms.filter((item)=>item.price <= price);
        // filter by size 
        tempRooms = tempRooms.filter((item)=>item.size >= minSize && item.size <= maxSize);
        this.setState({sortedRooms:tempRooms})
        
    }

    render() {
        return (
            <RoomContext.Provider value={{...this.state,getRoom:this.getRoom,handleChange:this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}


const RoomConsumer = RoomContext.Consumer;
export {RoomProvider,RoomConsumer,RoomContext}
