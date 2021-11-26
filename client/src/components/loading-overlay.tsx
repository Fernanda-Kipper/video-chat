import { Modal, ModalOverlay, ModalContent, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion'

const loadingContainer = {
  width: "50%",
  height: "2rem",
  display: "flex",
  justifyContent: "space-around"
};

const loadingCircle = {
  display: "block",
  width: "1.5rem",
  height: "1.5em",
  borderRadius: "0.75rem",
  backgroundColor: "#6b46c1"
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
}

const loadingCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut",
}

interface Props {
  loading: boolean;
}

export function LoadingOverlay(props: Props) {
  if (!props.loading) return <></>;

  return (
    <Modal isOpen={props.loading} isCentered onClose={() => {}}>
      <ModalOverlay>
        <ModalContent
          p="16"
          backgroundColor="gray.800"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text color="purple.600" fontWeight="bold" fontSize="2rem">Calling</Text>
          <motion.div
            style={loadingContainer}
            variants={loadingContainerVariants}
            initial="start"
            animate="end"
          >
            <motion.span
              style={loadingCircle}
              variants={loadingCircleVariants}
              transition={loadingCircleTransition}
            />
            <motion.span
              style={loadingCircle}
              variants={loadingCircleVariants}
              transition={loadingCircleTransition}
            />
            <motion.span
              style={loadingCircle}
              variants={loadingCircleVariants}
              transition={loadingCircleTransition}
            />
          </motion.div>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
