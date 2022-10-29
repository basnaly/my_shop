import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetListItems } from '../ItemRedux'
import ListItemBox from './ListItemBox'

const ListItems = () => {

    const listItems = useSelector(state => state?.item?.listItems)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetListItems())
    }, [])

  return (
    <div className="d-flex flex-column align-items-center overflow-auto h-100">
        { listItems.length === 0 ?
            <div>You don't have any list items yet!</div>
            :
            <div className="d-flex flex-wrap align-items-center justify-content-evenly">
                {listItems.map(el => (
                    <ListItemBox key={el.id} item={el} />
                ))}
            </div>
        }
      
    </div>
  )
}

export default ListItems
