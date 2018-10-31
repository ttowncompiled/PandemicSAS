import YAML

include("Game.jl")
using .Game

if length(ARGS) < 1
    println("EXITING: requires 'config.yml' file")
    exit(1)
end

data = YAML.load(open(ARGS[1]))

singleton = SingletonFactory(data)
println(singleton)

