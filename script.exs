defmodule DoubleAuction do
  use Xee.ThemeScript

  @script Path.join([__DIR__, "script.js"])

  # Callbacks

  def install do
    {_, 0} = System.cmd("npm", ["install", "linq"])
  end

  def init do
    call(["init"])
  end

  def join(data, id) do
    call(["join", Poison.encode!(data), id])
  end

  def handle_received(data, received) do
    call(["receive", Poison.encode!(data), Poison.encode!(received)])
  end

  def handle_received(data, received, id) do
    call(["receive", Poison.encode!(data), Poison.encode!(received), id])
  end

  # Other functions

  defp call(args) do
    case System.cmd("node", [@script] ++ args) do
      {result, 0} ->
        {:ok, Poison.decode!(result)}
      _ -> :error
    end
  end
end
