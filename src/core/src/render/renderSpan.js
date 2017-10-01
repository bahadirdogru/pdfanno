import setAttributes from '../utils/setAttributes'
import renderCircle, { DEFAULT_RADIUS, renderCircle2 } from './renderCircle'

/**
 * Create SVGRectElements from an annotation definition.
 * This is used for anntations of type `span`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGGElement|SVGRectElement} A group of all rects to be rendered
 */
export default function renderSpan (a, svg) {
    let color = a.color || '#FF0'

    let group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    // group.setAttribute('read-only', a.readOnly === true)
    // group.setAttribute('data-text', a.text)
    group.classList.add('anno-span')
    // group.style.zIndex = a.zIndex

    a.rectangles.forEach((r) => {
        let rect = createRect(r)
        rect.setAttribute('fill-opacity', 0.2)
        rect.setAttribute('fill', color)
        rect.classList.add('anno-span')
        group.appendChild(rect)
    })

    let rect = a.rectangles[0]
    let circle = renderCircle({
        x    : rect.x,
        y    : rect.y - DEFAULT_RADIUS,
        type : 'boundingCircle'
    })
    group.style.visibility = 'visible'
    group.appendChild(circle)

    return group
}

export function renderSpan2 (a, svg) {

    const color = a.color || '#FF0'

    const $base = $('<div/>').css({
        position   : 'absolute',
        top        : 0,
        left       : 0,
        visibility : 'visible'
    }).addClass('anno-span')

    a.rectangles.forEach(r => {
        $base.append(createRect2(r, color))
    })

    $base.append(renderCircle2({
        x    : a.rectangles[0].x,
        y    : a.rectangles[0].y,
        type : 'boundingCircle'
    }))

    return $base[0]


    // let group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    // // group.setAttribute('read-only', a.readOnly === true)
    // // group.setAttribute('data-text', a.text)
    // group.classList.add('anno-span')
    // // group.style.zIndex = a.zIndex

    // a.rectangles.forEach((r) => {
    //     let rect = createRect(r)
    //     rect.setAttribute('fill-opacity', 0.2)
    //     rect.setAttribute('fill', color)
    //     rect.classList.add('anno-span')
    //     group.appendChild(rect)
    // })

    // let rect = a.rectangles[0]
    // let circle = renderCircle({
    //     x    : rect.x,
    //     y    : rect.y - DEFAULT_RADIUS,
    //     type : 'boundingCircle'
    // })
    // group.style.visibility = 'visible'
    // group.appendChild(circle)

    // return group
}

function createRect (r) {
    let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    setAttributes(rect, {
        x      : r.x,
        y      : r.y,
        width  : r.width,
        height : r.height
    })

    return rect
}

function createRect2 (r, color) {

    return $('<div/>').addClass('anno-span__area').css({
        position        : 'absolute',
        top             : r.y + 'px',
        left            : r.x + 'px',
        width           : r.width + 'px',
        height          : r.height + 'px',
        // TODO 背景色に透過を設定して、全体でopacityにはしないようにする
        // そのために、HEXからrgbaに変換する実装が必要.
        backgroundColor : color,
        opacity         : 0.2,
        border          : '1px dashed gray'
    })

    // let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    // setAttributes(rect, {
    //     x      : r.x,
    //     y      : r.y,
    //     width  : r.width,
    //     height : r.height
    // })

    // return rect
}
