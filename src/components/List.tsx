import { useContext, useState } from "react";
import EXIF from "exif-js";
import { AppContext } from "../App";
import Modal from "./Modal";
import Favorite from "./Favorite";

const List = () => {
    const { data, sortType } = useContext(AppContext)
    const [isOpen, setIsOpen] = useState(false);
    const [imgMeata , setImgMeta] =useState('')
    const handleClose = () => {
        setIsOpen(false)
    }

    const [modalData, setModalData] = useState({
        title: '',
        description: '',
        tags: '',
        published: '',
        author: ''
    });

    const getImgMeta = (imgId : string) => {
        var img = document.getElementById(imgId) as any;
            EXIF.getData(img , function() {
                var allMetaData = EXIF.getAllTags(this);
                setImgMeta(JSON.stringify(allMetaData, null, "\t"))
            });
    }

    const listItems = () => {
        if (sortType === 'DESC') {
            return data?.items?.sort((a: any, b:any) => a.date_taken.localeCompare(b.date_taken))
        } else if (sortType === 'ASC') {
            return data?.items?.sort((a:any, b:any) => -a.date_taken.localeCompare(b.date_taken))
        } else {
            return data.items
        }
    }

    return (
        <ul className="flex flex-wrap gap-2">
            {listItems().length> 0 && listItems().map((item: any, index: number) => {
                return (
                    <li
                        key={`${item?.author_id}-${index}`}
                        className="h-40 flex-auto relative group cursor-pointer"
                        onClick={() => {
                            setModalData(item)
                            setIsOpen(true)
                            getImgMeta(`${item?.author_id}-${index}`)
                        }}
                    >
                        <img id={`${item?.author_id}-${index}`} className="w-full h-full object-fill" src={item?.media?.m} alt={item?.title} loading="lazy"/>
                        <div className="text-left bg-black absolute bottom-0 left-0 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="block text-white truncate text-ellipsis">{item?.title}</p>
                            <p className="text-white">by ${item.author}</p>
                            </div>
                            <span className="absolute top-0 right-0 inline-block p-1">
                                <Favorite itemId={item?.author_id} />
                            </span>
                        </div>
                    </li>
                )
            })}
            <Modal isOpen={isOpen} handleClose={handleClose}>
                <div>
                    <h3>
                        <span className="font-bold">Title:</span> {modalData?.title}</h3>
                    <div>
                        <span className="font-bold">Author:</span>
                        {(modalData.author?.match(/"[^"]*"/g) || [])[0]?.slice(1, -1)}</div>
                    <div>
                        <span className="font-bold">Desc:</span>
                        <span dangerouslySetInnerHTML={{ __html: modalData?.description }} />
                    </div>
                    <div>
                    <span className="font-bold">EXIF:</span>
                        {imgMeata}
                    </div>
                    {modalData.tags.trim() &&
                        <div>
                            <span className="font-bold">tags:</span>
                            {modalData.tags}</div>
                    }
                    <div className="mt-3">
                        Uploaded on{' '}
                        <span className="font-medium text-sm">
                            {new Date(modalData.published).toLocaleString('en-US',
                                { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
                            )}
                        </span>
                    </div>
                </div>
            </Modal>
        </ul>
    )
}
export default List