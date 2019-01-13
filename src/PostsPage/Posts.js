import React from "react";
import dateFns from "date-fns";
import { Chip } from "@material-ui/core";
import { Flex, Box, Card, Text, Image } from "rebass";

const Post = ({ post }) => {
  return (
    <Card m="15px" p="15px" width={["100%", "600px"]} borderRadius={4} boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)">
      <Flex>
        <Flex justifyContent="center" flexDirection="column">
          <div>
            <Image src={post.freelance.photoURL} width="150px" borderRadius={"50%"} style={{ maxWidth: "150px" }} />
          </div>
        </Flex>
        <Box flexDirection="column" py="10px" px="20px">
          <Text mt="5px" mb="5px" fontSize="14px" fontWeight="bold">
            {`${post.freelance.name} ${post.freelance.lastname} travail chez ${post.freelance.societe}`}
          </Text>
          <Text mb="8px" fontSize="12px">
            Le {dateFns.format(post.dateMsg, "D MMMM YYYY")}
          </Text>
          <Text>{post.msg}</Text>
          <Flex alignItems="center" mt="10px">
            <Text mr="10px">Techno :</Text>
            <Chip label={post.techno} />
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};

export function Posts({ posts }) {
  return (
    <Flex flexDirection="column" alignItems="center">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </Flex>
  );
}
