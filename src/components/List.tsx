import { useContext, useState } from "react";
import { AppContext } from "../App";
import Modal from "./Modal";

const List = () => {
    const { data } = useContext(AppContext)
    const [isOpen, setIsOpen] = useState(false);
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

    return (
        <ul className="flex flex-wrap gap-2">
            {data?.items?.map((item: any, index: number) => {
                return (
                    <li
                        key={`${item?.author_id}-${index}`}
                        className="h-40 flex-auto relative group cursor-pointer"
                        onClick={() => {
                            setModalData(item)
                            setIsOpen(true)
                        }}
                    >
                        <img className="w-full h-full object-fill" src={item?.media?.m} alt={item?.title} loading="lazy" />
                        <div className="text-left bg-black absolute bottom-0 left-0 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="block text-white truncate text-ellipsis">{item?.title}</p>
                            <p className="text-white">by ${item.author}</p>
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