import React, { Suspense } from 'react'
import SectionLoading from '../SectionLoading'
import { lazySections } from './sectionRegistry'

const getSectionComponent = (index) => lazySections[index] ?? null

function Center({ value }) {
    const ActiveSection = getSectionComponent(value)

    return (
        <div className='center'>
            <div className='center-container'>
                <Suspense fallback={<SectionLoading />}>
                    {ActiveSection ? <ActiveSection /> : null}
                </Suspense>
            </div>
        </div>
    )
}

export default Center