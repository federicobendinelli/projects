import * as THREE from 'three'
import Experience from './Experience.js'
import Ocean from './Ocean.js'


export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        


        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
            }
        })
        this.ocean = new Ocean()


    }


    resize()
    {
    }

    update()
    {

        if (this.ocean) {
            this.ocean.update();
        }

    }

    

    destroy()
    {
    }
}