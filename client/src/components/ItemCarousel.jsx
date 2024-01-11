import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';


export default function ItemCarousel() {
    const [index, setIndex] = useState(0);
    const [items, setItems] = useState([])

    useEffect(()=>{
        fetch('/items/?limit=8')
            .then(r=>r.json())
            .then(setItems)
    },[])


    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    if (items.length > 0) {
        return (
            <div className='carousel-container'>
                <Carousel 
                    activeIndex={index}
                    onSelect={handleSelect}
                    interval={null}
                    indicators={false}    
                    slide={false}
                >
                <Carousel.Item>
                    <div className='carousel-page'>
                        <CarouselTile item={items[0]}/>
                        <CarouselTile item={items[1]}/>
                        <CarouselTile item={items[2]}/>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='carousel-page'>
                        {/* <CarouselTile item={items[3]}/> */}
                        {/* <CarouselTile item={items[4]}/>
                        <CarouselTile item={items[5]}/> */}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='carousel-page'>
                        {/* <CarouselTile item={items[6]}/>
                        <CarouselTile item={items[7]}/> */}
                    </div>
                </Carousel.Item>
                </Carousel>
            </div>
        );
    } else {
        return <div className='carousel-loading'></div>
    }
}



function CarouselTile(props) {

    const {item} = props

    
    return (
        <div className='carousel-tile'>
            <img 
                className='carousel-tile-image'
                src={item.image_url}
            />
        </div>
    )

}