import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";


const Kuromi = ({ kuromiObj, isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newKuromi, setNewKuromi] = useState(kuromiObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this text?");
    if (ok) {
      await deleteDoc(doc(dbService, `kuromis/${kuromiObj.id}`));
      await deleteObject(ref(storageService, kuromiObj.attachmentUrl));
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, `kuromis/${kuromiObj.id}`), {
      text: newKuromi,
    })
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewKuromi(value);
  };


  return (
    <div className="kuromi">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container kuromiEdit">
          <h4 className="username">{kuromiObj.creatorName}</h4>
            <input
              type="text"
              placeholder="Edit your text"
              value={newKuromi}
              required
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Edit Text" className="formBtn" />
          </form>
          <button onClick={toggleEditing}className="formBtn cancelBtn">Cancel</button>
        </>
      ) : (
          <>
          <div>
          <h4 className="username">{kuromiObj.creatorName}</h4>
            <h4>{kuromiObj.text}</h4>
              {kuromiObj.attachmentUrl && (<img alt="img" src={kuromiObj.attachmentUrl}
              width="300px"
              className="kuromi-image"/>)}

              {isOwner && (
                <div className="kuromi__actions">
                  
                  <span onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </span>
                  <span onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </div>

          )}
          </div>
        </>
      )}
    </div>
  );
};

export default Kuromi;