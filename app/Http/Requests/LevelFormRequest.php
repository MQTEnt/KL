<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class LevelFormRequest extends Request
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
            'name' => 'required|name_in_group',
            'max' => 'required|numeric|greater:min|between_existed|out_existed:min',
            'min' => 'required|numeric|between_existed',
            'index_id' => 'exists:indexes,id'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Không được để trống',
            'name.name_in_group' => 'Đã tồn tại tên mức ở chỉ số này',
            'max.required' => 'Không được để trống',
            'max.numeric' => 'Chỉ số tối đa phải là dạng số',
            'max.greater' => 'Chỉ số tối đa phải lớn hơn chỉ số tối thiểu',
            'max.between_existed' => 'Chỉ số tối đa nằm trong mức đã tồn tại',
            'max.out_existed' => 'Chỉ số tối thiểu và tối đa chứa một mức đã tồn tại',
            'min.required' => 'Không được để trống',
            'min.numeric' => 'Chỉ số tối thiểu phải là dạng số',
            'min.between_existed' => 'Chỉ số tối thiểu nằm trong mức đã tồn tại',
            'index_id.exists' => 'Không tồn tại chỉ số'
        ];
    }
}
