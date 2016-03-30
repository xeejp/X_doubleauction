# DoubleAuctin for XEE

1. XEE_DIR/experiments/doubleauction/ に設置  

2. XEE_DIR/experiments/doubleauction/ で以下を実行

        npm install

3. XEE_DIR/config/experiment.exs に以下を追加

        experiment "DoubleAuction",
          file: "experiments/doubleauction/script.exs",
          host: "experiments/doubleauction/host.js",
          participant: "experiments/doubleauction/participant.js"
