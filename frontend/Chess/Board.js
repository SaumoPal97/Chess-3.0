import React, { useCallback, useRef, useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Chess } from "chess.js";

import Background from "./Background";
import Piece from "./Piece";
import { useMoralis } from "react-moralis";

const { width } = Dimensions.get("window");
import { SIZE } from "./Notation";

function useConst(initialValue) {
  const ref = useRef();
  if (ref.current === undefined) {
    // Box the value in an object so we can tell if it's initialized even if the initializer
    // returns/is undefined
    ref.current = {
      value:
        typeof initialValue === "function"
          ? // eslint-disable-next-line @typescript-eslint/ban-types
            initialValue()
          : initialValue,
    };
  }
  return ref.current.value;
}

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },
});

const Board = ({ toggleModalVisible }) => {
  const [updated, setUpdated] = useState();
  const { Moralis, user } = useMoralis();
  const currentUserId = (user || {}).id;
  const gameId = 24;
  const newMove = new Moralis.Object("Moves");

  const subscribeToMoves = async () => {
    let query = new Moralis.Query("Moves");
    let subscription = await query.subscribe();
    subscription.on("create", notifyOnCreate);
  };

  const notifyOnCreate = (result) => {
    setUpdated(result);
  };

  const isCurrentUser = (userId) => {
    return currentUserId === userId;
  };

  useEffect(() => {
    subscribeToMoves();
  }, []);

  const getAllMoves = async () => {
    const result = await Moralis.Cloud.run("getAllMoves");
    let lastOppMove;
    if (result) {
      lastOppMove = result
        .filter(
          (el) =>
            el[0].data.gameId == gameId && el[0].data.userId !== currentUserId
        )
        .reverse()[0];
    }
    if (chess.history({ verbose: true })[-1].san !== lastOppMove.san) {
      chess.move(lastOppMove);
      onTurn();
    }
  };

  useEffect(() => {
    getAllMoves();
  }, [updated]);

  const sendMove = (move) => {
    newMove.set("userId", currentUserId);
    newMove.set("gameId", gameId);
    newMove.set("move", move);
    newMove.save();
  };

  const chess = useConst(() => new Chess());
  const [state, setState] = useState({
    player: "w",
    board: chess.board(),
  });
  const onTurn = useCallback(
    (move) => {
      if (move) {
        sendMove(move);
      }
      console.log("over? ", chess.game_over());
      if (chess.game_over()) {
        toggleModalVisible(state.player);
      } else {
        setState({
          player: state.player === "w" ? "b" : "w",
          board: chess.board(),
        });
      }
    },
    [chess, state.player]
  );
  return (
    <View style={styles.container}>
      <Background />
      {state.board.map((row, y) =>
        row.map((square, x) => {
          if (square === null) {
            return null;
          }
          return (
            <Piece
              key={`${x}-${y}`}
              enabled={state.player === square.color}
              id={`${square.color}${square.type}`}
              onTurn={onTurn}
              position={{ x: x * SIZE, y: y * SIZE }}
              chess={chess}
            />
          );
        })
      )}
    </View>
  );
};

export default Board;
