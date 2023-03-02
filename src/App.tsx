import { motion } from "framer-motion"
import { useRef } from "react";
import styled from "styled-components";

//style
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AnimationBox = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.06);
`;

const VariantsBox = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2,1fr);
  background-color: rgba(255,255,255,0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.06);
`;

const InnerCircle = styled(motion.div)`
  width:70px;
  height: 70px;
  place-self: center;
  border-radius: 35px;
  background-color: white;
  box-shadow: 0 2px 3px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.06);
`;

const GuestureBox = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.06);
`;

const ConstraintWrapper = styled(motion.div)`
  width:600px;
  height: 600px;
  background-color: rgba(255,255,255,0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
`;

const ConstraintDrag = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.06);
`;


//motion
const animationVar = {
  start: { scale: 0 },
  end: {
    scale: 1,
    rotateZ: 360,
    transition: {
      type: "spring",
      delay: 3
    }
  },
}

const varientVar = {
  hidden: {
    scale: 0.5,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.8,
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const circleVar = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  }
}

const guestureVar = {
  hover: {
    scale: 1.5, rotateZ: 90
  },
  tab: {
    scale: 1,
    borderRadius: "100px"
  },
  drag: {
    backgroundColor: "rgba(46, 204, 113)",
    transition: {
      duration: 3
    }
  }
}

const constraintDragVar = {
  hover: {
    rotateZ: 90
  },
  click: {
    borderRadius: "100px"
  }
}

function App() {
  const constraintRef = useRef<HTMLDivElement>(null);


  return (
    <Wrapper>
      <ConstraintWrapper ref={constraintRef}>
        <ConstraintDrag
          drag
          dragSnapToOrigin
          dragElastic={1}
          dragConstraints={constraintRef}
          variants={constraintDragVar}
          whileHover="hover"
        />
      </ConstraintWrapper>

      <GuestureBox
        variants={guestureVar}
        drag
        whileDrag="drag"
        whileHover="hover"
        whileTap="tab"
      />

      <VariantsBox
        variants={varientVar}
        initial="hidden"
        animate="visible"
      >
        <InnerCircle variants={circleVar} />
        <InnerCircle variants={circleVar} />
        <InnerCircle variants={circleVar} />
        <InnerCircle variants={circleVar} />
      </VariantsBox>

      <AnimationBox
        variants={animationVar}
        initial="start"
        animate="end"
      />

      {/* <Box
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotateZ: 360 }}
        transition={{ type: "spring", bounce: 0.5, delay: 3 }}
      /> */}
      {/* <Box transition={{ duration: 3 }} animate={{ borderRadius: "100px" }} /> */}
    </Wrapper>
  );
}

export default App;
