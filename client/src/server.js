import {createServer, Model} from 'miragejs'

createServer({
    models: {
        items: Model,
    },
    
    seeds(server) {
        server.create("item", {id: "1", name: "Ninja Blender", price: 100, description:'asdfsasdf', imageUrl: "https://ak1.ostkcdn.com/images/products/8815072/Ninja-BL610-Black-1000-watt-Professional-Blender-5245aceb-067c-45bf-9587-8413f4ce204e_1000.jpg"})

        server.create("item", {id: "2", name: "Cuisinart Ice Cream Maker", price: 40, description: "asdfasdf", imageUrl: "https://ak1.ostkcdn.com/images/products/is/images/direct/540f5e05c97d9488350368d7e75e259cc4596292/Pure-Indulgence-2-Qt.-Frozen-Yogurt-Sorbet-%26-Ice-Cream-Maker-%28B.-Chrome%29.jpg"})
    },

    routes() {
        this.namespace = 'api'

        this.get('/items', (schema, request) => {
            return schema.items.all()
        })

        this.get('/items/:id', (schema, request)=> {
            const id = request.params.id
            return schema.items.find(id)
        })
    }
    
    
    
    
})