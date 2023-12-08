import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import EmployeeList from "../components/EmployeeList";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/EmployeeList">
                <EmployeeList/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews