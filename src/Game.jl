module Game

export City, CityStatus, Singleton, SingletonFactory

struct City
    name::String
    color::String
end

struct CityStatus
    city::City
    status::Dict{String, Int}
end

struct Singleton
    city_status::Dict{String, CityStatus}
end

function SingletonFactory(config)
    city_status = Dict{String, CityStatus}()
    for data = config["cities"]
        city = City(data["name"], data["color"])
        if ! (city.color in config["colors"])
            throw(DomainError(city.color, "must be in colors"))
        end
        status = Dict{String, Int}()
        for color = config["diseases"]
            if ! (color in config["colors"])
                throw(DomainError(color, "must be in colors"))
            end
            status[color] = 0
        end
        city_status[city.name] = CityStatus(city, status)
    end
    return Singleton(city_status)
end

end

