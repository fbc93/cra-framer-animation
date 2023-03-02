import { motion, useMotionValue, useTransform, useScroll } from "framer-motion"
import { useEffect, useRef } from "react";
import styled from "styled-components";

//style
const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg,#e09,#d0e);
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

const MotionValue = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.06);
`;

const Svg = styled(motion.svg)`
width: 150px;

path {
  stroke:white;
  stroke-width:10;
}
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
  const x = useMotionValue(0);
  // const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg, rgb(255,255,255), rgb(24,244,244), rgb(23,333,4))",
      "linear-gradient(135deg, rgb(153, 51, 51), rgb(128, 169, 169), rgb(383,83,222))",
      "linear-gradient(135deg, rgb(55, 158, 123), rgb(247, 190, 32), rgb(23,333,455))"
    ]
  );

  const { scrollY, scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

  const svg = {
    start: {
      pathLength: 0,
      fill: "rgba(255,255,255,0)"
    },
    end: {
      pathLength: 1,
      fill: "rgba(255,255,255,1)",
    }
  }

  // useEffect(() => {
  //   scrollY.on("change", () => {
  //     console.log(scrollY.get(), scrollYProgress.get());
  //   });
  // }, [scrollYProgress, scrollY]);

  // useEffect(() => {
  //   transformation.on("change", () => );
  // });

  return (
    <Wrapper style={{ x, background: gradient }}>

      <Svg
        viewBox="0 0 384 512">
        <motion.path
          variants={svg}
          initial="start"
          animate="end"
          transition={{
            default: {
              duration: 5
            },
            fill: {
              duration: 2, delay: 1
            }
          }}
          d="M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z" />
      </Svg>

      <button onClick={() => x.set(200)}>click ME</button>

      <MotionValue
        style={{ x, rotateZ, scale }}
        drag="x"
        dragSnapToOrigin
      />

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
