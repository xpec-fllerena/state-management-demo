import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ item, onDelete }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item?.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleDelete = () => {
    let confirmed = confirm(`Delete '${item.key}'`);
    confirmed && onDelete(item?.id);
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="card w-96 bg-base-100 border-2 border-red-400"
    >
      <div className="card-body">
        <div className="card-actions justify-end">
          <button className="btn btn-square btn-sm" onClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p>{item?.key}</p>
      </div>
    </div>
  );
};

export default Card;
