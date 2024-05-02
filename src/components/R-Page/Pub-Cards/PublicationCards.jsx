import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDocuments } from "../../../requests/histograms";
import "./PublicationCards.css";
import { convertDocObjectToCard } from "../../../applications/convertDocObjectToCardInfo";
import Badge from "react-bootstrap/Badge";

const PublicationCards = () => {
  const { publicationIds, documents } = useSelector(
    (state) => state.histograms
  );

  const dispatch = useDispatch();
  const [offSet, setOffSet] = useState(0);

  useEffect(() => {
    if (publicationIds.length) {
      const idsForRequest = publicationIds.slice(offSet, offSet + 10);
      idsForRequest.length && dispatch(getDocuments({ ids: idsForRequest }));
    }
  }, [publicationIds, dispatch, offSet]);

  if (!documents.length) return null;

  const docs = convertDocObjectToCard(documents);

  const showTenArticles = () => setOffSet(offSet + 10);

  const isDone = documents.length >= publicationIds.length;

  return (
    <>
      <div className="articleCards__wrapper">
        {docs.map((obj, ind) => (
          <div className="articleCards__card" key={ind}>
            <div className="articleCards__header">
              <span className="articleCards__date">{obj.date}</span>
              <a className="articleCards__link" href={obj.articleUrl}>
                {obj.articleUrlTitle}
              </a>
            </div>
            <h4 className="articleCards__title">{obj.articleTitle}</h4>
            {obj.articleTags &&
              obj.articleTags.map((tag) => (
                <Badge bg="warning" text="dark" key={tag}>
                  {tag}
                </Badge>
              ))}
            {obj.imageUrl && (
              <img
                className="articleCards__image"
                src={obj.imageUrl}
                alt="article pic"
              />
            )}
            <div dangerouslySetInnerHTML={{ __html: obj.articleContent }} />
            <div className="articleCards__footer">
              <form action={obj.articleUrl} target="_blank">
                <button className="articleCards__button">
                  Читать источник
                </button>
              </form>
              <section className="articleCards__wordCount">
                {obj.wordCount} слов&lang;а&rang;
              </section>
            </div>
          </div>
        ))}
      </div>
      <div className="articleCards__moreButtonContainer">
        {!isDone && (
          <button
            onClick={showTenArticles}
            className="articleCards__showMoreButton"
          >
            Показать больше
          </button>
        )}
      </div>
    </>
  );
};

export default PublicationCards;
