import MissionBox from './MissionBox';
import styles from './Missions.module.css';

function Missions() {
  return (
    <div className={styles.missions}>
      <h1 className={styles.h1}>"Cooking, Connecting, Creating Memories"</h1>
      <div>
        <MissionBox img="./ourMission1.jpg" alt="Family cooking together">
          Cooking has always been more than just preparing meals—it is a
          timeless tradition that brings people together. Across cultures and
          generations, the act of sharing a homemade dish has symbolized love,
          connection, and warmth. Whether it's a family recipe passed down
          through the years or a new dish created with friends, the kitchen has
          always been a place where stories are shared, laughter fills the air,
          and memories are made.
        </MissionBox>
        <MissionBox img="./ourMission2.jpg" alt="Community">
          In a world that moves fast, cooking allows us to slow down and be
          present. The simple act of kneading dough, stirring a simmering pot,
          or setting a table for loved ones reminds us of the joy found in
          everyday moments. Food has a unique way of transcending language and
          background, uniting us all with the universal comfort of a home-cooked
          meal.
        </MissionBox>
        <MissionBox img="./ourMission3.jpg" alt="Health and well-being">
          Our mission is to celebrate this beautiful tradition by providing a
          space where recipes are shared, creativity flourishes, and people come
          together through the love of food. Whether you're an experienced cook
          or just beginning your culinary journey, we hope our collection of
          recipes inspires you to gather, create, and cherish the moments spent
          around the table.
        </MissionBox>
      </div>
    </div>
  );
}

export default Missions;
