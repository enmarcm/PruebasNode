import z from "zod"

const addPokemonSchema = z.object({
    name: z.string().min(3).max(20),
    image: z.string().image(),
    types: z.array(z.string().min(3).max(20)).min(1),
    attacks: z.array(z.string().min(3).max(20)).min(1),
    games: z.array(z.string().min(3).max(20)).min(1)
})

export const verifyAddPokemon = async ({ data }) => {
    return await addPokemonSchema.safeParseAsync(data)
}