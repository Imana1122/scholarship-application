<?php

namespace Database\Factories;


use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\School>
 */

class SchoolFactory extends Factory
{

   /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'school_name' => $this->faker->company,
            'school_type' => $this->faker->randomElement(['Secondary School']),
            'school_email' => $this->faker->unique()->safeEmail,
            'school_phone' => $this->faker->unique()->randomNumber(5),
            'school_address' => $this->faker->address,
            'school_category' => $this->faker->randomElement(['Public', 'Private', 'Community']),
            'established_date' => $this->faker->date,
            'principal_name' => $this->faker->name,
            'principal_email' => $this->faker->unique()->safeEmail,
            'principal_phone' => $this->faker->unique()->randomNumber(5),
            'school_license' => $this->faker->randomNumber(8),
            'password' => 'password123', // Hashed default password
        ];
    }
}
