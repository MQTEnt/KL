<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class PatientFormRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|min:3',
            'address' => 'required|min:5',
            'city' => 'required|min:3',
            'id_card' => 'required|numeric|min:9',
            'email' => 'email'
        ];
    }
}
