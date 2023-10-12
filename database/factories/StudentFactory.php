<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'symbol_number' => $this->faker->unique()->randomNumber(5),
            'gender' => $this->faker->randomElement(['Male', 'Female','Other']),
            'first_name' => $this->faker->firstName,
            'middle_name' => $this->faker->lastName,
            'last_name' => $this->faker->lastName,
            'temporary_address'=>$this->faker->address,
            'permanent_address'=>$this->faker->address,
            'scored_gpa' => $this->faker->randomFloat(2, 0, 4), // Generate GPA between 0 and 4
            'school_id' => function () {
                // Retrieve an existing school ID from the database
                return \App\Models\School::inRandomOrder()->first()->id;
            },
            'phone_number' => $this->faker->unique()->randomNumber(5),
            'mother_name' => $this->faker->name('female'),
            'father_name' => $this->faker->name('male'),
            'mother_phone_number' => $this->faker->unique()->randomNumber(5),
            'father_phone_number' => $this->faker->numerify('##########')
        ];
    }
}
