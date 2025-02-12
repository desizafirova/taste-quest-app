import { useNavigate } from 'react-router-dom';
import Button from './Button';
import styles from './RecipeCard.module.css';

type RecipeCardProps = {
  id: number | string;
  title: string;
  image: string;
  page: number;
  recipesPerPage: number;
};

function RecipeCard(props: RecipeCardProps) {
  const { id, title, image, page, recipesPerPage } = props;
  const navigate = useNavigate();

  return (
    <div className={styles.containerCard}>
      <div key={id} className={styles.flex}>
        <div>
          <img src={image} alt={title} className={styles.img} />
          <h2 className={styles.h2}>{title}</h2>
        </div>
        <div className={styles.cardFooter}>
          <Button
            textOnly={false}
            onClick={() => {
              navigate(`/recipes/${id}`, {
                state: {
                  page,
                  number: recipesPerPage,
                  offset: (page - 1) * recipesPerPage,
                },
              });
            }}
          >
            Go to the recipe &rarr;
          </Button>
        </div>
      </div>
      ;
    </div>
  );
}

export default RecipeCard;
